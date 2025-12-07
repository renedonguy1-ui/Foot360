// Filtre des actualités
const filterButtons = document.querySelectorAll('.filter');
const newsCards = document.querySelectorAll('.news-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const tag = btn.dataset.tag;
    newsCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      const show = tag === 'all' || tags.includes(tag);
      card.style.display = show ? '' : 'none';
    });
  });
});

// Modale vidéo
const videoCards = document.querySelectorAll('.video-card');
const modal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalPlayer');
const modalClose = document.querySelector('.modal__close');
const modalBackdrop = document.querySelector('.modal__backdrop');

function openModal(src){
  modal.setAttribute('aria-hidden', 'false');
  modalPlayer.src = src + '?autoplay=1';
}
function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  modalPlayer.src = '';
}
videoCards.forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.video));
});
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Mini feed communauté
const form = document.getElementById('communityForm');
const feed = document.getElementById('communityFeed');

form.addEventListener('submit', e => {
  e.preventDefault();
  const pseudo = document.getElementById('pseudo').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!pseudo || !message) return;

  const post = document.createElement('div');
  post.className = 'post';
  const now = new Date().toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  post.innerHTML = `
    <div class="post__meta">${pseudo} • ${now}</div>
    <div class="post__body">${message}</div>
  `;
  feed.prepend(post);
  form.reset();
});