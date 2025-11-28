


//动画形式
export type AnimationType = 'lift' | 'scale' | 'slide' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'glow' | 'pulse';

//动画阶段类名后缀
export type AnimationStage = 'enter-from' | 'enter-active' | 'enter-to' | 'leave-from' | 'leave-active' | 'leave-to'



export const getAnimationClassName = (animation: AnimationType | AnimationType[], stage: AnimationStage): string => {
    return Array.isArray(animation) ? animation.map(i => `${i}-${stage}`).join(' ') : `${animation}-${stage}`
}

export const getAnimationAllClassNames = (animation: AnimationType | AnimationType[]): AnimationStage[] => {
    return ['enter-from', 'enter-active', 'enter-to', 'leave-from', 'leave-active', 'leave-to']
}