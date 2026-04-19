(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
    body{opacity:0;transition:opacity .5s ease-out}
    body.anim-ready{opacity:1}
    .reveal{opacity:0;transform:translateY(22px);transition:opacity .85s cubic-bezier(.2,.7,.2,1),transform .85s cubic-bezier(.2,.7,.2,1);will-change:opacity,transform}
    .reveal.is-in{opacity:1;transform:none}
    .intro-stagger > *{opacity:0;transform:translateY(14px);transition:opacity .75s cubic-bezier(.2,.7,.2,1),transform .75s cubic-bezier(.2,.7,.2,1)}
    .intro-stagger.is-in > *{opacity:1;transform:none}
    .intro-stagger.is-in > *:nth-child(1){transition-delay:.05s}
    .intro-stagger.is-in > *:nth-child(2){transition-delay:.18s}
    .intro-stagger.is-in > *:nth-child(3){transition-delay:.31s}
    .intro-stagger.is-in > *:nth-child(4){transition-delay:.44s}
    .intro-stagger.is-in > *:nth-child(5){transition-delay:.57s}
    .intro-stagger.is-in > *:nth-child(6){transition-delay:.70s}
    html{scroll-behavior:smooth}
    @media (prefers-reduced-motion: reduce){
      body,.reveal,.intro-stagger > *{opacity:1;transform:none;transition:none}
      html{scroll-behavior:auto}
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function ready(){
    document.body.classList.add('anim-ready');
    if(reduce) return;

    const selectors = [
      '.case','.service','.stat','.stack-card','.timeline-item',
      '.impact-card','.channel-card','.flow-step','.ba-col',
      '.case-section','.case-stat','.section-head','.process .step',
      '.clients-head','.client-cell','.testimonial-card','blockquote',
      '.case-hero-subtitle','.case-hero-meta','.metrics-table',
      '.cta-actions','.marquee','.next-case','.case-nav'
    ].join(',');

    document.querySelectorAll(selectors).forEach(el => el.classList.add('reveal'));

    const hero = document.querySelector('.case-hero-grid, .hero');
    if(hero){
      const target = hero.querySelector('.case-hero-title, .hero-left, .hero-inner') || hero;
      target.classList.add('intro-stagger');
      requestAnimationFrame(()=>requestAnimationFrame(()=>target.classList.add('is-in')));
    }

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < window.innerHeight * 0.95){
        setTimeout(()=>el.classList.add('is-in'), 60);
      } else {
        io.observe(el);
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
