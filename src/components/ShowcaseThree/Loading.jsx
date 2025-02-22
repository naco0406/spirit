import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { css, keyframes } from '@emotion/css';
import { loadingState, sceneState } from './store';

export const Loading = () => {
    const ref = useRef(null);
    const loadingSnap = useSnapshot(loadingState);

    // useEffect(() => {
    //     const disableLoading = () => {
    //         ref.current.classList.add('disable');
    //         ref.current.ontransitionend = () => {
    //             ref.current.style.visibility = 'hidden';
    //             gsap.to(sceneState, { lightProgress: 1, duration: 1.5, delay: 0.3, ease: 'power3.in' });
    //         };
    //     };

    //     if (loadingSnap.completed) {
    //         disableLoading();
    //     }

    //     setTimeout(() => {
    //         if (!loadingSnap.completed) {
    //             disableLoading();
    //         }
    //     }, 2000);
    // }, [loadingSnap.completed]);
    useEffect(() => {
        const element = ref.current; // 요소 참조

        const disableLoading = () => {
            if (element) {
                element.classList.add('disable');
                element.ontransitionend = () => {
                    element.style.visibility = 'hidden';
                    gsap.to(sceneState, { lightProgress: 1, duration: 1.5, delay: 0.3, ease: 'power3.in' });
                };
            }
        };

        if (loadingSnap.completed) {
            disableLoading();
        }

        const timeoutId = setTimeout(() => {
            if (!loadingSnap.completed) {
                disableLoading();
            }
        }, 2000);

        return () => {
            if (element) {
                element.ontransitionend = null;
            }
            clearTimeout(timeoutId);
        };
    }, [loadingSnap.completed]);


    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.circle(0)} />
            <div className={styles.circle(0.25)} />
            <div className={styles.circle(0.5)} />
        </div>
    );
};

const animations = {
    circle: keyframes`
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0);
        }
    `
};

const styles = {
    container: css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        opacity: 1;
        transition: opacity 0.5s;

        &.disable {
            opacity: 0;
        }
    `,
    circle: (delay) => css`
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
        animation: ${animations.circle} 2s infinite ${delay}s;
    `
};
