import React, { useState } from 'react';
import styles from '../styles/introduction.module.css';
import DownIcon from 'mdi-react/ChevronDownIcon';
import UpIcon from 'mdi-react/ChevronUpIcon';

function Introduction() {

    const [isOpen, setOpen] = useState<boolean>(false);

    const open = () => {
        setOpen(true);
    }

    const close = () => {
        setOpen(false);
    }
    return (
        <div className={isOpen?styles.introDown:styles.introUp}>
            <div className={isOpen?styles.title:styles.closeTitle}>
                <div className={styles.text}>ABOUT US</div>
                {isOpen ? <button className={isOpen?styles.icon:styles.closeIcon} onClick={close}><UpIcon /></button>
                    : <button className={isOpen?styles.icon:styles.closeIcon} onClick={open}><DownIcon /></button>}
            </div>
            {isOpen && <div className={styles.content}>
                안녕하세요:) SSBTI를 개발한 팀 MoSS의
                정현우, 권연욱, 김종성, 송은주, 장주빈입니다.<br/>
                SSBTI는 16가지 유형의 삼성 가전 캐릭터에 어울리는 삼성 제품을 추천해주고,
                지인에게 공유하며 즐거움을 느낄 수 있는 서비스입니다!<br/>
                Cloud Native 기반으로 개발해 유동적인 트래픽 상황에서 확장 가능하고, 
                안정적인 서비스를 제공합니다.<br/>
                많은 도움 주신 <span className={styles.bold}>안계완</span> 멘토님 감사합니다♥
            </div>}
        </div>
    )
}

export default Introduction;