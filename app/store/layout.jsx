import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "ShopAuthen - Store Dashboard",
    description: "ShopAuthen - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
