import '@styles/_product-info.scss';
import Rating from 'components/rating';
import Link from 'next/link';
import { ProductInfoTypes } from './product-info.tsx';

const ProductInfo = ({ productMeta, features, tags }: ProductInfoTypes): JSX.Element => {
    const anchorProps = {
        target: '_self',
    };
    return (
        <div className="product-info">
            <p className="product-info__title">{productMeta?.title}</p>
            <div className="product-info__rating">
                <div className="product-info__stars">
                    <Rating rating={productMeta?.rating} />
                </div>
                <div className="product-info__reviews">{productMeta?.reviews}</div>
            </div>
            <div className="product-info__pricing">{productMeta?.price}</div>
            <div className="product-info__features">
                <p className="product-info__featuretitle">{features?.title}</p>
                <ul className="product-info__featurelist">
                    {features?.features.map((x, index) => (
                        <li key={index} className="product-info__featureitem">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-info__tags">
                <p className="product-info__tagstitle">{tags?.title}</p>
                <ul className="product-info__taglist">
                    {tags?.tags.map((x, index) => (
                        <li key={index} className="product-info__tagitem">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-info__articles">
                <Link href="https://main--my-franklin-website--manaswini-mahala.hlx.live/" legacyBehavior>
                    <a className="product-info__target" {...anchorProps}>
                        Related Articles
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default ProductInfo;
