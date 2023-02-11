import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Spin, List, Empty } from 'antd/es';

import { IAccountData, useGetAccountListQuery } from './playerInfoApi';

import './PlayerInfo.css';

const descriptionForEmpty = (
    <b>
        <div>Нет совпадений или введено менее 3-х символов.</div>
        <div>Регистр при поиске не учитывается!</div>
    </b>
);

const PlayerInfo: React.FC = () => {
    const navigate = useNavigate();

    const [ searchValue, setSearchValue ] = useState<string>('');

    const { data: accountList, isFetching } = useGetAccountListQuery({ search: searchValue }, { skip: searchValue.length < 3 });

    const nickNameList = accountList?.data?.map((account: IAccountData) => (
        <List.Item className="player-info__search-item" onClick={() => navigate(`/players/${account.account_id}`)} key={account.account_id}>
            <a>{account.nickname}</a>
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
