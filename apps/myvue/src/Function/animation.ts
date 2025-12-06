


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

export type AnimationProperties =  ('width' | 'height')[]

//生成节点的动画生成
/**
 * 切换动画
 * @param element 元素
 * @param isOpening 是否展开
 * @param duration 动画时间
 * @param properties 动画属性: 'width' | 'height'
 * @returns 
 */
export async function animateHeight(element: HTMLElement, isOpening: boolean, duration = 150, properties: AnimationProperties = ['height'],timeFunction: string = 'cubic-bezier(0.4, 0, 0.2, 1)') {
    if (duration <= 0) {
        properties.forEach(property => {
            element.style[property] = isOpening ? 'auto' : '0px';
        });
        element.style.opacity = isOpening ? '1' : '0';
        element.style.display = isOpening ? '' : 'none';
        return;
    }

    if (isOpening) {
        // 展开
        element.style.display = ''; // Ensure element is visible before animation
        properties.forEach(property => {
            element.style[property] = 'auto';
        });
        const { height, width } = element.getBoundingClientRect();

        properties.forEach(property => {
            element.style[property] = '0px';
        })

        const startValues: Record<string, string | number> = {
            height: '0px',
            width: '0px',
            opacity: 0,
        }

        const endValues: Record<string, string | number> = {
            height: `${height}px`,
            width: `${width}px`,
            opacity: 1,
        }

        const animation = element.animate(
            [
                startValues,
                endValues,
            ],
            {
                duration,
                easing: timeFunction, // 平滑的缓动函数
            }
        );

        animation.onfinish = () => {
            properties.forEach(property => {
                element.style[property] = 'auto';
            });
        };
    } else {
        // 折叠
        const { height, width } = element.getBoundingClientRect();
        properties.forEach(property => {
            element.style[property] = `${property === 'height' ? height : width}px`;
        });
        const startValues: Record<string, string | number> = {
            height: `${height}px`,
            width: `${width}px`,
            opacity: 1,
        }
        const endValues: Record<string, string | number> = {
            height: '0px',
            width: '0px',
            opacity: 0,
        }

        const animation = element.animate(
            [
                startValues,
                endValues,
            ],
            {
                duration,
                easing: timeFunction,
            }
        );

        animation.onfinish = () => {
            element.style.display = 'none';
            properties.forEach(property => {
                element.style[property] = '0px';
            });
        };
    }
    return null
}

export type AnimationDurationOptions = {
    itemCount: number;
    baseDuration?: number;
    durationPerItem?: number;
    maxDuration?: number;
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
    { itemCount, baseDuration = 150, durationPerItem = 25, maxDuration = 800 }: AnimationDurationOptions
): number {
    const duration = baseDuration + itemCount * durationPerItem;
    return Math.min(duration, maxDuration);
}
