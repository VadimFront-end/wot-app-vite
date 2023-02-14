import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchOutlined, LoadingOutlined, PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Input, Spin, List, Empty, Button, Tooltip } from 'antd/es';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { IAccountData, useGetAccountListQuery } from './playerInfoApi';
import { Actions, setPlayersComparison } from './storePlayerInfo';

import './PlayerInfo.less';

const descriptionForEmpty = (
    <b>
        <div>Нет совпадений или введено менее 3-х символов.</div>
        <div>Регистр при поиске не учитывается!</div>
    </b>
);

const PlayerInfo: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const playersComparison = useAppSelector(state => state.playerInfo.playersComparison);

    const [ searchValue, setSearchValue ] = useState<string>('');

    const { data: accountList, isFetching } = useGetAccountListQuery({ search: searchValue }, { skip: searchValue.length < 3 });

    const onClickAddPlayer = (e: React.MouseEvent<HTMLElement, MouseEvent>, accountId: number) => {
        e.stopPropagation();
        dispatch(setPlayersComparison({ playerId: accountId, rule: playersComparison.includes(accountId) ? Actions.delete : Actions.add }));
    };

    const tooltipTitle = (accountId: number): string => {
        if (playersComparison.length > 3 && !playersComparison.includes(accountId)) {
            return 'Максимум 4 для сравнения';
        }
        if (playersComparison.includes(accountId)) {
            return 'Удалить из сравнения';
        }

        return 'Добавить к сравнению';
    };

    const nickNameList = accountList?.data?.map((account: IAccountData) => (
        <List.Item className="player-info__search-item" onClick={() => navigate(`/players/statistic/${account.account_id}`)} key={account.account_id}>
            <a>{account.nickname}</a>
            <Tooltip title={tooltipTitle(account.account_id)} placement="left">
                <Button
                    disabled={playersComparison.length > 3 && !playersComparison.includes(account.account_id)}
                    icon={playersComparison.includes(account.account_id) ? <MinusCircleTwoTone /> : <PlusCircleTwoTone />}
                    onClick={e => onClickAddPlayer(e, account.account_id)}
                />
            </Tooltip>
        </List.Item>
    ));

    return (
        <>
            <Input
                size="large"
                prefix={isFetching ? <LoadingOutlined /> : <SearchOutlined />}
                placeholder="Введите ник игрока"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <Spin spinning={isFetching}>
                {nickNameList?.length && searchValue.length > 2 ? (
                    <List bordered>{nickNameList}</List>
                ) : (
                    <Empty description={descriptionForEmpty} style={{ padding: '8px', fontSize: '16px' }} />
                )}
            </Spin>
        </>
    );
};

export default PlayerInfo;