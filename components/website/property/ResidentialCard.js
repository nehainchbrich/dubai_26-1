import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { currencyConverter, imageKitLoader } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import styles from '../../../styles/ResidentialLuxury.module.css'; // Updated CSS module

const ResidentialCard = ({ item }) => {
    const { currency } = useCurrency();
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);

    useEffect(() => {
        const handleCurrencyConversion = async () => {
            try {
                let cMinAmount;
                let cMaxAmount;
                if (item.minAmount) {
                    cMinAmount = parseInt(item.minAmount) ? await currencyConverter(parseInt(item.minAmount), currency) : null;
                }
                if (item.maxAmount) {
                    cMaxAmount = parseInt(item.maxAmount) ? await currencyConverter(parseInt(item.maxAmount), currency) : null;
                }

                if (item.is_rental == 1 && item.minAmount != null) {
                    cMinAmount = parseInt(item.minAmount) ? await currencyConverter(item.minAmount, currency) : null;
                    if (cMinAmount) cMinAmount = `${cMinAmount}`;
                }

                setMinAmount(cMinAmount);
                setMaxAmount(cMaxAmount);
            } catch (error) {
                console.error("Currency conversion error", error);
            }
        };
        handleCurrencyConversion();
    }, [item, currency]);

    const priceDisplay = () => {
        if (parseInt(item.minAmount) > 0) {
            if (parseInt(item.maxAmount) > 0 && minAmount && maxAmount) {
                return `${minAmount} - ${maxAmount}`;
            }
            return minAmount || 'Price on Request';
        }
        return 'Price on Request';
    };

    return (
        <div className={styles.rowCard}>
            <div className={styles.imgSide}>
                {item.PCategory?.title && (
                    <div className={styles.typeBadge}>{item.PCategory.title}</div>
                )}
                <Link href={`/properties/${item.slug}`}>
                    <Image
                        loader={imageKitLoader}
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className={styles.image}
                        placeholder="blur"
                        blurDataURL={staticBlurDataUrl()}
                        sizes="(max-width: 768px) 100vw, 320px"
                    />
                </Link>
            </div>

            <div className={styles.contentSide}>
                <div className={styles.lifestyleTag}>Luxury Lifestyle</div>
                <Link href={`/properties/${item.slug}`}>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                </Link>

                <div className={styles.rowLoc}>
                    <i className="fas fa-map-marker-alt"></i>
                    {item.city}, {item.country}
                </div>

                <div className={styles.rowFeatures}>
                    {/* Placeholder data since original component didn't explicitly map these. Reusing standard placeholders or item data where available. */}
                    <span><i className="fas fa-expand-arrows-alt"></i> {item.area || '1,400 sq ft'}</span>
                    <span><i className="fas fa-bed"></i> {item.property_type?.[0]?.title || 'Multi-Unit'}</span>
                    <span><i className="fas fa-hard-hat"></i> {item.Developer?.name}</span>
                </div>

                <div className={styles.cardBottom}>
                    <div className={styles.rowPrice}>
                        {priceDisplay()}
                        {item.is_rental === 1 && <span>/{item.rental_type || 'Year'}</span>}
                    </div>

                    <div className={styles.rowRating}>
                        <Link href={`/properties/${item.slug}`} className={styles.mapBtn}>
                            <i className="fas fa-compass"></i> Explore
                        </Link>
                        <a
                            href={`https://wa.me/971585966666?text=Hello, I am interested in ${item.title}. Can you please provide more details?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappBtn}
                        >
                            <i className="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidentialCard;
