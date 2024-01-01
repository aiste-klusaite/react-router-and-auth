import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from "../../src/components/MainNavigation";

export const RootLayout = () => {
    const navigation = useNavigation();

    return <>
        <MainNavigation />
        <main>
            {navigation.state === 'loading' && <p>Loading...</p>}
            <Outlet />
        </main>
    </>
}