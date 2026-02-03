
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import enka, json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UIDRequest(BaseModel): # defines type for uid request from Hero.tsx
    uid: str

class JsonRequest(BaseModel):
    json_name: str

# 1001410288 for test uid
@app.post('/valid_uid')
async def valid_uid(data: UIDRequest):
    try:
        async with enka.ZZZClient(timeout=5) as client:
            raw = await client.fetch_showcase(data.uid, raw=True)
        if not raw:
            raise HTTPException(status_code=404, detail='uid not found')
        return {
            'uid': data.uid,
            'valid': True
        }
    except Exception as e:
        print('error', e)
        raise HTTPException(
            status_code=503,
            detail='service unavailable'
        )

@app.post('/get_showcase')
async def get_showcase(data: UIDRequest):
    try:
        async with enka.ZZZClient(timeout=5) as client:
            raw = await client.fetch_showcase(data.uid, raw=True)
            
            if not raw:
                raise HTTPException(status_code=404, detail='uid not found')
            
        s = client.parse_showcase(raw)
    except HTTPException:
        raise
    except Exception as e:
        print('error:', e)
        raise HTTPException(
            status_code=503,
            detail='zzz service unavailable'
        )
        
    disc_icon_json = './.enka_py/assets/zzz/equipments.json'
    try:
        with open(disc_icon_json, 'r', encoding='utf-8') as j:
            icons = json.load(j)
    except:
        print('error, file not found or failed to decode')
        return
    
    # list of agents
    agent_list = []
    
    # for drive discs
    for a in s.agents:
        discs = []
        for d in a.discs:
            sub = []
            sub.append({
                'sub_stat': d.main_stat.name,
                'sub_stat_value': d.main_stat.value
            })
            for substats in d.sub_stats:
                sub.append({
                    'sub_stat': substats.name,
                    'sub_stat_value': substats.value
                })
                
            set_id = str(d.set_id)
            set_icon = icons.get("Suits", {}).get(set_id, {}).get("Icon")
            discs.append({
                'slot': d.slot,
                'set_id': d.set_id,
                'set_icon': set_icon,
                'id': d.id,
                'uid': d.uid,
                'level': d.level,
                'rarity': d.rarity,
                'substats': sub
            })
    
        # for specific stats
        agent_stats = []
        for stat_type, stat_obj in a.stats.items():
            agent_stats.append({
                'name': stat_type.name,
                'value': stat_obj.value
            })
    
    
        # for skills
        askills = []
        for skill in a.skills:
            askills.append({
                'skill_type': skill.type.name,
                'skill_lvl': skill.level
            })
            
        # for wengine stats
        w = a.w_engine
        wm = w.main_stat
        ws = w.sub_stat
        
        agent_list.append({
            'name': a.name,
            'rarity': a.rarity,
            'color_accent': a.color.accent,
            'color_mindscape': a.color.mindscape,
            'level': a.level,
            'promotion': a.promotion,
            'mindscape': a.mindscape,
            'element': a.elements[0],
            'stats': agent_stats,
            'core_skill_lvl': a.core_skill_level_num,
            'skills': askills,
            'discs': discs,
            'wengine': {
                'name': w.name,
                'id': w.id,
                'uid': w.uid,
                'level': w.level,
                'specialty': w.specialty,
                'icon': w.icon,
                'modification': w.modification,
                'rarity': w.rarity_num,
                'phase': w.phase,
                'main_stat': {
                    'name': wm.name,
                    'value': wm.value
                },
                'sub_stat': {
                    'name': ws.name,
                    'value': ws.value
                }
            }
        })
    
    with open('./jsons/playerdata.json', 'w') as f:
        json.dump({
            'player': {
                'name': s.player.nickname,
                'avatar': s.player.avatar_id,
                'id': s.player.id,
                'namecard_id': s.player.namecard.id,
                'namecard_icon': s.player.namecard.icon,
                'signature': s.player.signature,
                'level': s.player.level
            },
            'agents': agent_list 
        }, f, indent=2)
    
    return {
        'player': {
            'name': s.player.nickname,
            'uid': s.player.uid,
            'avatar_id': s.player.id,
            'namecard_id': s.player.namecard.id,
            'namecard_icon': s.player.namecard.icon,
            'signature': s.player.signature,
            'level': s.player.level
        },
        'agents': agent_list 
    }
