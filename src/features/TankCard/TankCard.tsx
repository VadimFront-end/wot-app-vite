import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ContextOnChangeId } from 'App';

import { useGetTankInfoQuery } from './tanksCardApi';

const TankCard: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();

    const onChangeId = useContext(ContextOnChangeId);

    const { data: tankInfo } = useGetTankInfoQuery({ tank_id: +(id as string) }, { skip: !id });

    const { images, name } = tankInfo?.data[+id] || {};
    console.log(tankInfo?.data[+id].default_profile);

    useEffect(() => {
        if (name) {
            onChangeId(name);
        }
    }, [ id, name, onChangeId ]);

    return (
        <>
            <img src={images?.big_icon} alt="Танк" style={{ margin: 'auto', display: 'block' }} />
        </>
    );
};

export default TankCard;