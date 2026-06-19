import React from 'react'
import styles from './PageSkeleton.module.css'

interface PageSkeletonProps {
  type: 'list' | 'detail' | 'contact' | 'text'
}

export default function PageSkeleton({ type }: PageSkeletonProps) {
  // Render subpage header skeleton
  const renderHeader = (customEyebrow = false) => (
    <div className={styles.header}>
      <div className={`${styles.skeletonBase} ${styles.eyebrow}`} />
      <div className={`${styles.skeletonBase} ${styles.title}`} />
      <div className={`${styles.skeletonBase} ${styles.lead}`} />
      <div className={`${styles.skeletonBase} ${styles.leadShort}`} />
    </div>
  )

  switch (type) {
    case 'list':
      return (
        <div className={styles.main}>
          <div className={styles.container}>
            {renderHeader()}
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.card}>
                  <div className={`${styles.skeletonBase} ${styles.cardImg}`} />
                  <div className={styles.cardBody}>
                    <div className={`${styles.skeletonBase} ${styles.cardChip}`} />
                    <div className={`${styles.skeletonBase} ${styles.cardTitle}`} />
                    <div className={styles.cardDesc}>
                      <div className={`${styles.skeletonBase} ${styles.cardDescLine1}`} />
                      <div className={`${styles.skeletonBase} ${styles.cardDescLine2}`} />
                    </div>
                    <div className={`${styles.skeletonBase} ${styles.cardLink}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'detail':
      return (
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.backNav}>
              <div className={`${styles.skeletonBase} ${styles.backLink}`} />
            </div>

            <div className={styles.hero}>
              <div className={styles.heroText}>
                <div className={`${styles.skeletonBase} ${styles.detailChip}`} />
                <div className={`${styles.skeletonBase} ${styles.detailTitle}`} />
                <div className={styles.detailLead}>
                  <div className={`${styles.skeletonBase} ${styles.detailLead1}`} />
                  <div className={`${styles.skeletonBase} ${styles.detailLead2}`} />
                </div>
                <div className={styles.scopeBox}>
                  <div className={`${styles.skeletonBase} ${styles.scopeTitle}`} />
                  <div className={`${styles.skeletonBase} ${styles.scopeItem}`} />
                  <div className={`${styles.skeletonBase} ${styles.scopeItem}`} />
                  <div className={`${styles.skeletonBase} ${styles.scopeItem}`} />
                </div>
                <div className={`${styles.skeletonBase} ${styles.heroActions}`} />
              </div>
              <div className={`${styles.skeletonBase} ${styles.heroImg}`} />
            </div>

            <div className={styles.blocks}>
              <div className={styles.splitBlock}>
                <div className={styles.splitContent}>
                  <div className={`${styles.skeletonBase} ${styles.splitTitle}`} />
                  <div className={styles.splitText}>
                    <div className={`${styles.skeletonBase} ${styles.splitTextLine}`} />
                    <div className={`${styles.skeletonBase} ${styles.splitTextLine}`} />
                    <div className={`${styles.skeletonBase} ${styles.splitTextLineShort}`} />
                  </div>
                </div>
                <div className={`${styles.skeletonBase} ${styles.splitImg}`} />
              </div>

              <div className={styles.splitBlock}>
                <div className={`${styles.skeletonBase} ${styles.splitImg}`} />
                <div className={styles.splitContent}>
                  <div className={`${styles.skeletonBase} ${styles.splitTitle}`} />
                  <div className={styles.splitText}>
                    <div className={`${styles.skeletonBase} ${styles.splitTextLine}`} />
                    <div className={`${styles.skeletonBase} ${styles.splitTextLine}`} />
                    <div className={`${styles.skeletonBase} ${styles.splitTextLineShort}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case 'contact':
      return (
        <div className={styles.main}>
          <div className={styles.container}>
            {renderHeader()}
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <div className={`${styles.skeletonBase} ${styles.infoTitle}`} />
                <div className={styles.addressBox}>
                  <div className={`${styles.skeletonBase} ${styles.addressLine}`} />
                  <div className={`${styles.skeletonBase} ${styles.addressLine}`} />
                  <div className={`${styles.skeletonBase} ${styles.addressLineShort}`} />
                </div>
                <div className={styles.addressBox}>
                  <div className={`${styles.skeletonBase} ${styles.addressLine}`} />
                  <div className={`${styles.skeletonBase} ${styles.addressLineShort}`} />
                </div>
              </div>
              <div className={styles.contactForm}>
                <div className={styles.formField}>
                  <div className={`${styles.skeletonBase} ${styles.formLabel}`} />
                  <div className={`${styles.skeletonBase} ${styles.formInput}`} />
                </div>
                <div className={styles.formField}>
                  <div className={`${styles.skeletonBase} ${styles.formLabel}`} />
                  <div className={`${styles.skeletonBase} ${styles.formInput}`} />
                </div>
                <div className={styles.formField}>
                  <div className={`${styles.skeletonBase} ${styles.formLabel}`} />
                  <div className={`${styles.skeletonBase} ${styles.formInput}`} />
                </div>
                <div className={styles.formField}>
                  <div className={`${styles.skeletonBase} ${styles.formLabel}`} />
                  <div className={`${styles.skeletonBase} ${styles.formInput}`} style={{ height: '100px' }} />
                </div>
                <div className={`${styles.skeletonBase} ${styles.formButton}`} />
              </div>
            </div>
          </div>
        </div>
      )

    case 'text':
      return (
        <div className={styles.main}>
          <div className={styles.container}>
            {renderHeader()}
            <div className={styles.textWrapper}>
              <div className={styles.textParagraph}>
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLineShort}`} />
              </div>
              <div className={styles.textParagraph}>
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLineShort}`} />
              </div>
              <div className={styles.textParagraph}>
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLine}`} />
                <div className={`${styles.skeletonBase} ${styles.textLineShort}`} />
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}
