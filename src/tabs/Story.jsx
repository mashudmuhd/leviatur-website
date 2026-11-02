import React from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {products} from '../data';
import {Reveal, SectionTitle, CampaignImage, ProductPrice} from '../ui';

const noteArtwork = {
  leviatur: {
    src: `${import.meta.env.BASE_URL}images/leviatur-notes.webp`,
    alt: 'Grapefruit, ginger, ambrette seeds, vetiver roots, musk and amber-like aromatic crystals',
    width: 1774,
    height: 887
  },
  'rose-lavi': {
    src: `${import.meta.env.BASE_URL}images/rose-lavi-notes.webp`,
    alt: 'Raspberry, Amalfi lemon, neroli, jasmine, orange flower, gardenia, white honey, patchouli and amber',
    width: 1752,
    height: 897
  }
};

export default function Story() {
  const reduced = useReducedMotion();

  return <div className="wrap page">
    <SectionTitle eyebrow="STORY & NOTES" title={<>The invisible.<br/><em>Made personal.</em></>}>
      Fragrance is a language without words.
    </SectionTitle>

    <section className="story-grid">
      <Reveal className="story-diptych">
        <div><CampaignImage id="leviatur"/><span>THE WARMTH / LEVIATUR</span></div>
        <div><CampaignImage id="rose-lavi"/><span>THE WHISPER / ROSE LAVI</span></div>
      </Reveal>
      <Reveal className="story-copy">
        <p className="eyebrow">OUR POINT OF VIEW</p>
        <h2>A little mystery.<br/>A lasting connection.</h2>
        <p>We believe the most beautiful impressions are often the quietest. A familiar warmth. An unexpected softness. A scent that feels entirely your own.</p>
        <p>Leviatur moves from grapefruit and ginger into a deep, woody trail. Rose Lavi opens with bright fruit and citrus, blooms into white florals, then settles into honeyed amber.</p>
        <div className="craft"><span>01</span><div><h3>Ingredients as emotion</h3><p>Woods suggest warmth. Florals bring light. Our scent stories explore how notes feel, as much as how they smell.</p></div></div>
        <div className="craft"><span>02</span><div><h3>The art of balance</h3><p>A fragrance unfolds in layers — a first impression, a living heart, and the intimate trace that stays.</p></div></div>
      </Reveal>
    </section>

    <section className="pyramids">
      <p className="eyebrow">THE SCENT ARCHITECTURE</p>
      <h2>Every layer, <em>a feeling.</em></h2>
      <div className="pyramid-grid">
        {products.map(product => {
          const artwork = noteArtwork[product.id];
          return <Reveal key={product.id} className={'pyramid-world pyramid-' + product.id}>
            <img className="pyramid-photo note-artwork" src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} loading="lazy" decoding="async"/>
            <h3>{product.name}</h3>
            <p>{product.story}</p>
            <ProductPrice/>
            <div className="pyramid">
              {product.notes.map(([level, notes], index) => <motion.div
                key={level}
                className={'scent-layer layer-' + index}
                initial={{opacity: 0, y: reduced ? 0 : 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: reduced ? 0 : .5, delay: reduced ? 0 : index * .12}}
              >
                <span>{level} <small>{['THE FIRST ENCOUNTER', 'THE SOUL OF THE SCENT', 'THE LASTING IMPRESSION'][index]}</small></span>
                <p>{notes}</p>
              </motion.div>)}
            </div>
          </Reveal>;
        })}
      </div>
      <p className="content-note">A considered blend of bright openings, expressive florals and lasting warmth.</p>
    </section>
  </div>;
}
