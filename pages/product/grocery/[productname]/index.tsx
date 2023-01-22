import { aemHeadlessClient, queries } from 'aemHeadless';
import Breadcrumb from 'components/breadcrumb';
import PDPTemplate from 'components/pdp-template';
import Seo from 'components/seo';
import { mapImagesForGallery } from 'helpers/productImageHelper';
import { breadcrumbStore } from 'helpers/routeHelper';
import { capitalizeFirst } from 'helpers/stringHelper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';

const GroceryCategory = ({ productname, ...props }: { productname: string }) => {
    const { images, faqData, tabInfo }: { [x: string]: any } = props;
    const imagesMap = mapImagesForGallery(images);
    const setRoute = breadcrumbStore((state) => state.setRoute);

    useEffect(() => {
        setRoute({
            route: '/',
            routeName: capitalizeFirst(productname),
        });
    }, []);
    return (
        <React.Fragment>
            {<Seo pageTitle={capitalizeFirst(productname)} />}
            <section>
                <PDPTemplate MediaGalleryContent={imagesMap} FAQData={faqData} TabInfo={tabInfo} />
            </section>
        </React.Fragment>
    );
};

GroceryCategory.getLayout = () => {
    const breadCrumbList = breadcrumbStore((state) => state.breadcrumbRoute);
    return <Breadcrumb list={breadCrumbList} />;
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    let productName = context.query?.productname;
    let imagePath = `${process.env.NEXT_AEM_PRODUCT_PATH}grocery/${productName}/product-images`;
    let infoPath = `${process.env.NEXT_AEM_PRODUCT_PATH}grocery/${productName}/tabinfo`;
    let productPageJSON = await aemHeadlessClient.runPersistedQuery(queries.productDetail, {
        imagePath,
        infoPath,
    });
    let { headerByPath, footerByPath, productMediaGalleryList, productInfoList, accordionByPath } =
        productPageJSON?.data;
    return {
        props: {
            headerData: headerByPath?.item,
            footerData: footerByPath?.item,
            images: productMediaGalleryList?.items[0]?.original,
            tabInfo: productInfoList?.items[0]?.tabInfo?.tabInfo,
            faqData: accordionByPath?.item?.faq?.faq,
            productname: productName,
        },
    };
};

export default GroceryCategory;
