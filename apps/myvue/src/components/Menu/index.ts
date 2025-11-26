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


export function animateHeight(element: HTMLElement, isOpening: boolean, duration = 250) {
    if (duration <= 0) {
        element.style.height = isOpening ? 'auto' : '0px';
        element.style.opacity = isOpening ? '1' : '0';
        return;
    }

    if (isOpening) {
        // 展开
        element.style.height = 'auto';
        const { height } = element.getBoundingClientRect();
        element.style.height = '0px';

        const animation = element.animate(
            [
                { height: '0px', opacity: 0 },
                { height: `${height}px`, opacity: 1 },
            ],
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // 平滑的缓动函数
            }
        );

        animation.onfinish = () => {
            element.style.height = 'auto'; // 动画结束后设置为 auto 以适应内容变化
        };
    } else {
        // 折叠
        const { height } = element.getBoundingClientRect();
        element.style.height = `${height}px`;

        const animation = element.animate(
            [
                { height: `${height}px`, opacity: 1 },
                { height: '0px', opacity: 0 },
            ],
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }
        );

        animation.onfinish = () => {
            element.style.height = '0px'; // 动画结束后设置为 0
        };
    }
}

