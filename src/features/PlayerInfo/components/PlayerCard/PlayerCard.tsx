import React from 'react';
import { useParams } from 'react-router-dom';

import { Tabs } from 'antd/es';

import PlayerTanksList from './components/PlayerTanksList/PlayerTanksList';
import CommonPlayerInfo from './components/CommonPlayerInfo/CommonPlayerInfo';

const PlayerCard: React.FC = () => {
    const { id: playerId = '' } = useParams<{ id: string }>();

    const items = [
        {
            label: 'Общая информация',
            key: '1',
            children: <CommonPlayerInfo playerId={playerId} />,
        },
        {
            label: 'Техника игрока',
            key: '2',
            children: <PlayerTanksList playerId={playerId} />,
        },
    ];

    return playerId ? <Tabs defaultActiveKey="1" size="large" items={items} /> : null;
};

export default PlayerCard;
