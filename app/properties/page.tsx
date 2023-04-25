
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }

    const listings = await getListings({ userId: currentUser.id });

    if (!listings || listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="空的财产列表"
                    subtitle="您没有发布任何房屋信息"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default PropertiesPage;