import { Outlet } from 'react-router-dom';
import { CommonLayout } from '../../layouts/CommonLayout';

export const MainPage = () => {
    return (
        <CommonLayout>
            <Outlet />
        </CommonLayout>
    );
};
