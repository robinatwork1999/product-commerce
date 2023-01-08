import '@layout/_homepage.scss';
import CardInfo from 'components/card-info';
import FadeInSection from 'components/fading';
import Seo from 'components/seo';
import Teaser from 'components/teaser';
import Text from 'components/text';
import React from 'react';
import 'regenerator-runtime/runtime';
import CardData from '.././sample/cardCategory.json';
import FeatureData from '.././sample/cardFeatures.json';

const Home = (): JSX.Element => {
    return (
        <React.Fragment>
            <Seo pageTitle="Home" />
            <section className="homepage">
                <Teaser imageURL="/" />
                <Text textData="Browse Products" />
                {CardData && (
                    <React.Fragment>
                        <div className="homepage-productsearch">
                            {CardData.map((data: any, index: number) => (
                                <React.Fragment key={index}>
                                    <CardInfo
                                        cardText={data.cardText}
                                        cardSubText={data.cardSubText}
                                        cardIcon={data.cardIcon}
                                        cardType="products"
                                        type={data.type}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </React.Fragment>
                )}
                <FadeInSection>
                    <React.Fragment>
                        <div className="homepage-feature">
                            <Text textData="Features Provided" />
                        </div>
                        {FeatureData && (
                            <div className="homepage-list">
                                <ul>
                                    {FeatureData.map((data, index) => (
                                        <li key={index}>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </React.Fragment>
                </FadeInSection>
            </section>
        </React.Fragment>
    );
};

export default Home;
