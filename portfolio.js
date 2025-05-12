document.addEventListener('DOMContentLoaded', function () {
  const username = 'BerkCeng';
  const portfolioContainer = document.getElementById('portfolio-images');
  const commonImage = 'picture_pack/pexels-lukas-574071.jpg'; // Ortak görsel

  portfolioContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Projeler yükleniyor...</p>
    </div>
  `;

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(response => response.json())
    .then(repos => {
      portfolioContainer.innerHTML = ''; 
      repos.forEach(repo => {
        const col = document.createElement('div');
        col.className = 'col';

        const item = document.createElement('div');
        item.className = 'portfolio-item';

        const link = document.createElement('a');
        link.href = repo.html_url;
        link.target = '_blank';

        const img = document.createElement('img');
        img.className = 'img-fluid';
        img.src = commonImage;
        img.alt = repo.name;

        const overlay = document.createElement('div');
        overlay.className = 'img-overlay';
        overlay.style.opacity = 0;
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.backgroundColor = 'rgba(24,188,156,0.9)';
        overlay.style.transition = 'opacity 0.3s ease';

        const title = document.createElement('span');
        title.textContent = repo.name;
        title.style.color = '#fff';
        title.style.fontSize = '2rem';
        title.style.fontWeight = 'bold';
        title.style.textAlign = 'center';
        title.style.marginBottom = '1rem';

        const description = document.createElement('p');
        description.textContent = repo.description || 'Açıklama yok';
        description.style.color = '#fff';
        description.style.fontSize = '1.4rem';
        description.style.textAlign = 'center';
        description.style.padding = '0 1rem';

        overlay.appendChild(title);
        overlay.appendChild(description);
        link.appendChild(img);
        link.appendChild(overlay);
        item.appendChild(link);
        col.appendChild(item);
        portfolioContainer.appendChild(col);

        // Hover efekti
        item.addEventListener('mouseenter', () => {
          overlay.style.opacity = '1';
        });
        item.addEventListener('mouseleave', () => {
          overlay.style.opacity = '0';
        });
      });
    })
    .catch(error => {
      portfolioContainer.innerHTML = '<p>Projeler yüklenirken bir hata oluştu.</p>';
    });
}); 