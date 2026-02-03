
import ellenBg from '../../../assets/showcase/agentbgs/ellen.jpg';
import miyabiBg from '../../../assets/showcase/agentbgs/miyabi.jpg';
import shunguangBg from '../../../assets/showcase/agentbgs/shunguang.jpg';
import s11Bg from '../../../assets/showcase/agentbgs/s11.jpg';

import ellenT from '../../../assets/showcase/agentthumbnails/ellen.jpg';
import miyabiT from '../../../assets/showcase/agentthumbnails/miyabi.jpg';
import shunguangT from '../../../assets/showcase/agentthumbnails/shunguang.jpg';
import s11T from '../../../assets/showcase/agentthumbnails/s11.jpg';



export const AgentImgs = {
    ellen: {
        thumbnail: ellenT,
        bg: ellenBg
    },
    miyabi: {
        thumbnail: miyabiT,
        bg: miyabiBg
    },
    yeshunguang: {
        thumbnail: shunguangT,
        bg: shunguangBg
    },
    soldier11: {
        thumbnail: s11T,
        bg: s11Bg
    }
} as const;

export type AgentName = keyof typeof AgentImgs;