import React, { useEffect, useState } from 'react';

import { Row, Col, Empty } from 'antd/es';

import { useAppSelector } from 'app/hooks';
import { getPrettyNumber } from 'app/helpers';

import descriptionPattern from '../PlayerCard/descriptionPattern';
import { dataWithAccountId } from '../../../../commonForApi';

import './PlayersComparison.less';

const PlayersComparison: React.FC = () => {
    const [ playersInfo, setPlayersInfo ] = useState<Record<string, Record<string, string>>>({});
    
    const playersComparison = useAppSelector(state => state.playerInfo.playersComparison);
    
    useEffect(() => {
        if (playersComparison.length) {
            Promise.all(playersComparison.map(id => {
                const params = Object.entries(dataWithAccountId({ account_id: id }))
                    .map(([ key, value ], index) => `${index ? '&' : ''}${key}=${value}`)
                    .join('');

                return fetch(`https://api.tanki.su/wot/account/info/?${params}`)
                    .then(res => res.json())
                    .then(accountInfo => ({ [id]: accountInfo?.data?.[id || 0]?.statistics?.all || {} }));
            })).then(data => {
                setPlayersInfo(data.reduce((result, accountData) => ({ ...result, ...accountData }), {}));
            });
        }
    }, [ playersComparison ]);
    
    const renderCol = (value: string | number, key: React.Key, isBold = false) => (
        <Col
            span={24 / playersComparison.length + 1}
            style={{ maxWidth: `calc(100% / ${playersComparison.length + 1})` }}
            key={key}
        >
            {isBold ? <b>{value}</b> : value}
        </Col>
    );

    const dataComparison = Object.entries(descriptionPattern).map(([ key, value ]) => (
        <Row key={key} className="players-comparison">
            {renderCol(value, 'null')}
            {playersComparison.map(id => renderCol(getPrettyNumber(playersInfo[id]?.[key]?.toString()), id, true))}
        </Row>
    ));

    return Object.keys(playersInfo).length ? (
        <>
            <Row className="players-comparison">
                {renderCol('', 'null')}
                {playersComparison.map(id => renderCol(id, id, true))}
            </Row>
            {dataComparison}
        </>
    ) : <Empty description="Выберите игроков для сравнения" />;
};

export default PlayersComparison;