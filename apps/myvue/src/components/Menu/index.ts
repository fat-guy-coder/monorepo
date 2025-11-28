export interface MenuItem {
    id: string;
    name: string;
    label: string;
    path: string;
    icon?: string;
    hasChildren?: boolean;
    children?: MenuItem[];
    [key: string]: unknown;
}


export type MenuMode = 'inline' | 'vertical';


export function animateHeight(element: HTMLElement, isOpening: boolean, duration = 250, mode?: MenuMode) {
    if (duration <= 0) {
        element.style.height = isOpening ? 'auto' : '0px';
        element.style.opacity = isOpening ? '1' : '0';
        return;
    }

    const isVertical = mode === 'vertical';

    if (isOpening) {
        // 展开
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
            if (isVertical) {
                element.style.width = '0px';
            }
        };
    }
}

