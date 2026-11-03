import './OrderCard.css';
import ArrowIcon from '../ArrowIcon';
import React,{useState,useEffect,useRef}from'react';import{brand,products}from'../data';import{SectionTitle,CampaignImage,ProductPrice}from'../ui';
const faqs=[['How do I place an order?','Choose your fragrance and quantity, then prepare your order. Send your prepared order directly to us on WhatsApp at +971 56 865 9590. Each 50 ml bottle is AED 80. Availability and delivery are confirmed in conversation.'],['What size are the fragrances?','Both fragrances are 50 ml eau de parfum at AED 80 each.'],['Which fragrance should I choose?','Explore Leviatur for grapefruit, ginger and a deep woody-amber trail. Rose La Vie pairs raspberry and Amalfi lemon with white florals, honey and amber. Ask the brand about samples before purchasing.'],['What about shipping and returns?','Delivery areas, shipping fees and return terms have not been supplied. Please confirm these with the brand before completing your purchase.']];
function FragrancePicker({order, setOrder}) {
  const track = useRef(null);
  const timer = useRef(null);
  const initialOrder = useRef(order);
  const index = products.findIndex(product => product.id === order);

  function scrollToCard(index, animated) {
    const rail = track.current;
    const card = rail.children[index];
    if (!card) return;
    const left = card.offsetLeft - rail.children[0].offsetLeft;
    const smooth = animated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollTo({left, behavior: smooth ? 'smooth' : 'instant'});
  }
  function select(index) {
    setOrder(products[index].id);
    scrollToCard(index, true);
  }
  function settle() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const rail = track.current;
      if (!rail) return;
      const start = rail.children[0].offsetLeft + rail.scrollLeft;
      const cards = Array.from(rail.children);
      const nearest = cards.reduce((best, card) =>
        Math.abs(card.offsetLeft - start) < Math.abs(best.offsetLeft - start) ? card : best);
      setOrder(nearest.dataset.id);
    }, 140);
  }
  useEffect(() => {
    scrollToCard(products.findIndex(product => product.id === initialOrder.current), false);
    return () => clearTimeout(timer.current);
  }, []);
  return <fieldset className="order-choices">
    <legend>Choose your fragrance</legend>
    <div className="scent-rail" ref={track} onScroll={settle}>
      {products.map((product, i) => <label key={product.id} data-id={product.id} className="order-choice">
        <input type="radio" name="fragrance" aria-label={product.name} value={product.id} checked={order === product.id} onChange={() => select(i)} />
        <span className="order-choice-face">
          <CampaignImage id={product.id}/>
          <span className="scent-label"><strong>{product.name}</strong><small>{product.family}</small></span>
          <span className="scent-indicator" aria-hidden="true"/>
        </span>
      </label>)}
    </div>
    <div className="scent-navigation">
      <small aria-live="polite">{String(index + 1).padStart(2,'0')} / {String(products.length).padStart(2,'0')}</small>
      <button type="button" aria-label="Previous fragrance" disabled={index <= 0} onClick={() => select(index - 1)}><ArrowIcon/></button>
      <button type="button" aria-label="Next fragrance" disabled={index >= products.length - 1} onClick={() => select(index + 1)}><ArrowIcon/></button>
    </div>
  </fieldset>;
}
export default function Contact({order,setOrder}){const[message,setMessage]=useState('');const dialog = useRef(null);
useEffect(() => {
  if (!message) return;
  const element = dialog.current;
  const previous = document.body.style.overflow;
  element.showModal();
  document.body.style.overflow = 'hidden';
  return () => {
    element.close();
    document.body.style.overflow = previous;
  };
}, [message]);
function submit(e){e.preventDefault();const d=new FormData(e.currentTarget);const p=products.find(p=>p.id===order);const quantity = Number(d.get('quantity'));const total = Math.floor(quantity / 2) * 150 + (quantity % 2) * 80;setMessage(`Hello Leviatur, I’d like to enquire about an order.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nFragrance: ${p.name}\nSize: ${p.size} eau de parfum\nQuantity: ${d.get('quantity')}\nUnit price: AED 80 per 50 ml bottle\nFragrance total: AED ${total}\n\nPlease confirm availability and delivery.`)}return <div className="wrap page"><SectionTitle eyebrow="CONTACT / ORDER" title={<>Your next <em>signature.</em></>}>Some connections begin with a scent. Let’s find yours.</SectionTitle><div className="contact-grid"><section className="order-box enquiry-card"><div className="form-heading"><p className="enquiry-kicker">LEVIATUR ATELIER</p><h2>Begin an enquiry</h2></div><form onSubmit={submit} onChange={() => setMessage('')}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength="100"/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" required pattern="[+0-9() .-]{7,20}" title="Enter a phone number with 7–20 characters"/></label></div><FragrancePicker order={order} setOrder={setOrder}/>
<label className="bottle-count">Number of bottles<input name="quantity" type="number" min="1" max="20" defaultValue="1" required/></label>
<ProductPrice/><button className="gold-button w-full" type="submit">Prepare WhatsApp order <span><ArrowIcon/></span></button><p className="form-note">An enquiry, with a personal touch. No payment is taken here.</p></form>{message && <dialog ref={dialog} className="order-review" aria-labelledby="review-heading"
  onCancel={() => setMessage('')} onClick={event => { if (event.target === dialog.current) setMessage(''); }}>
  <div className="review-body">
    <p className="eyebrow">LEVIATUR · PARFUM ATELIER</p>
    <h2 id="review-heading">Review your order</h2>
    <pre>{message.split('\n\n')[1]}</pre>
    <p>Availability and delivery will be confirmed on WhatsApp.</p>
    <a className="gold-button" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`}>Order now <ArrowIcon/></a>
    <button autoFocus type="button" className="review-edit" onClick={() => setMessage('')}>Edit order</button>
  </div>
</dialog>}</section><aside className="contact-aside"><div className="order-fragrance" key={order}><CampaignImage id={order}/><div><span className="eyebrow">YOUR SELECTED SCENT</span><h3>{products.find(p=>p.id===order)?.name}</h3><p>50 ml · Eau de parfum · AED 80</p></div></div><p className="eyebrow">A MORE PERSONAL APPROACH</p><h2>Good taste.<br/><em>Real conversation.</em></h2><p>Ask about a scent, find your match, or enquire about gifting. A thoughtful fragrance begins with a thoughtful choice.</p><div className="contact-channel"><span>WHATSAPP</span>{brand.whatsapp?<a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">{brand.whatsappDisplay} <ArrowIcon/></a>:<p>Contact details coming soon</p>}</div><div className="contact-channel"><span>CALL US</span><a href={`tel:${brand.phone}`}>{brand.phoneDisplay} <ArrowIcon/></a></div><div className="contact-channel"><span>INSTAGRAM</span>{brand.instagram?<a href={brand.instagram} target="_blank" rel="noreferrer">Inside the atelier <ArrowIcon/></a>:<p>Brand profile coming soon</p>}</div></aside></div><section className="faq"><p className="eyebrow">A FEW THINGS TO KNOW</p><h2>The finer details.</h2>{faqs.map(([q,a],i)=><details key={q}><summary><span><small>0{i+1}</small>{q}</span><span className="faq-plus">+</span></summary><p>{a}</p></details>)}</section></div>}
