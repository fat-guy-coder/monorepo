


//切换动画形式
export type AnimationType = 'lift' | 'scale' | 'slide' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'glow' | 'pulse';

//动画阶段类名后缀
export type AnimationStage = 'enter-from' | 'enter-active' | 'enter-to' | 'leave-from' | 'leave-active' | 'leave-to'



export const getAnimationClassName = (animation: AnimationType | AnimationType[], stage: AnimationStage): string => {
    return Array.isArray(animation) ? animation.map(i => `${i}-${stage}`).join(' ') : `${animation}-${stage}`
}

export const getAnimationAllClassNames = (animation: AnimationType | AnimationType[]): AnimationStage[] => {
    return ['enter-from', 'enter-active', 'enter-to', 'leave-from', 'leave-active', 'leave-to']
}


//生成节点的动画生成
/**
 * 切换动画
 * @param element 元素
 * @param isOpening 是否展开
 * @param duration 动画时间
 * @param mode 动画模式
 * @returns 
 */
export async function animateHeight(element: HTMLElement, isOpening: boolean, duration = 250, mode: 'vertical' | 'inline' = 'inline') {
    if (duration <= 0) {
        element.style.height = isOpening ? 'auto' : '0px';
        element.style.opacity = isOpening ? '1' : '0';
        element.style.display = isOpening ? '' : 'none';
        return;
    }

    const isVertical = mode === 'vertical';

    if (isOpening) {
        // 展开
        element.style.display = ''; // Ensure element is visible before animation
        element.style.height = 'auto';
        if (isVertical) {
            element.style.width = 'auto';
        }
        const { height, width } = element.getBoundingClientRect();
        element.style.height = '0px';
        if (isVertical) {
            element.style.width = '0px';
        }

        const startValues: Record<string, string | number> = {
            height: '0px',
            opacity: 0,
        }

        const endValues: Record<string, string | number> = {
            height: `${height}px`,
            opacity: 1,
        }
        if (isVertical) {
            startValues.width = '0px';
            endValues.width = `${width}px`;
        }

        const animation = element.animate(
            [
                startValues,
                endValues,
            ],
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // 平滑的缓动函数
            }
        );

        animation.onfinish = () => {
            element.style.height = 'auto'; // 动画结束后设置为 auto 以适应内容变化
            if (isVertical) {
                element.style.width = 'auto';
            }
        };
    } else {
        // 折叠
        const { height, width } = element.getBoundingClientRect();
        element.style.height = `${height}px`;
        if (isVertical) {
            element.style.width = `${width}px`;
        }
        const startValues: Record<string, string | number> = {
            height: `${height}px`,
            opacity: 1,
        }
        const endValues: Record<string, string | number> = {
            height: '0px',
            opacity: 0,
        }
        if (isVertical) {
            startValues.width = `${width}px`;
            endValues.width = '0px';
        }

        const animation = element.animate(
            [
                startValues,
                endValues,
            ],
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }
        );

        animation.onfinish = () => {
            element.style.height = '0px'; // 动画结束后设置为 0
            element.style.display = 'none'; // Hide element after animation
            if (isVertical) {
                element.style.width = '0px';
            }
        };
        return new Promise((resolve) => {
            animation.onfinish = () => {
                element.style.height = '0px'; // 动画结束后设置为 0
                element.style.display = 'none'; // Hide element after animation
                if (isVertical) {
                    element.style.width = '0px';
                }
                resolve(true)
            }
        })
    }
    return null
}

//根据列表数量获取动画时间
/**
 * 根据列表项数量计算动画时间
 * @param itemCount 列表项数量
 * @param baseDuration 基础动画时间 (ms)
 * @param durationPerItem 每个列表项增加的动画时间 (ms)
 * @param maxDuration 最大动画时间 (ms)
 * @returns 计算后的动画时间 (ms)
 */
export function calculateAnimationDuration(
    itemCount: number,
    baseDuration = 150,
    durationPerItem = 25,
    maxDuration = 800
): number {
    const duration = baseDuration + itemCount * durationPerItem;
    return Math.min(duration, maxDuration);
}
