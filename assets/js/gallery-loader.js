// Auto-load images from gallery subfolders
document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const galleryName = gallery.getAttribute('data-gallery');
  if (!galleryName) return;

  // Determine base path based on current location
  const isInGalerie = location.pathname.includes('/pages/galerie/');
  const basePath = isInGalerie ? '../../' : '../';

  try {
    if (galleryName === 'all') {
      // Load all galleries
      loadAllGalleries(basePath, gallery);
    } else {
      // Load specific gallery
      const imagePath = `${basePath}assets/images/galerie/${galleryName}/`;
      const imageMap = {
        'balkone': [
          'Balkongeländer-Milchglasfüllung.jpg',
          'Balkongeländer-MilchglasfüllungII.jpg',
          'Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg',
          'Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg',
          'Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg',
          'Balkongeländer-mit-satiniertem-Glas.jpg',
          'Verz.-Ausführung-Füllung-Trespaplatten-II.jpg',
          'Verzinkte-Ausführung-Füllung-Trespaplatten.jpg',
          'Verz.-Ausführung-Lochblechfüllung.jpg'
        ],
        'treppen': [
          'Stahlwangentreppe-mit-Podest.jpg',
          'Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg',
          'DSC01602.jpg',
          'IMG_0841-e1495619483297.jpg',
          'Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg',
          'TreppenhausfestverglasungI.jpg',
          'Riek-Treppe-1.jpg',
          'Riek-Treppe.jpg'
        ],
        'vordaecher': [
          'Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg',
          'DSC00235-1.jpg',
          'DSC01658-1.jpg',
          'DSC01659.jpg',
          'Edelstahlvordach-mit-Klarglasfüllung.jpg',
          'Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg',
          'Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg',
          'Terrassenüberdachung-verzinkte-Ausführung-I.jpg'
        ],
        'franzoesische-balkone': [
          'IMG_3310.jpg',
          'IMG_3311.jpg',
          'Edelstahl-mit-Klarglas-ohne-Handlauf.jpg',
          'TreppenhausfestverglasungI.jpg',
          'TreppenhausfestverglasungII.jpg'
        ],
        'gartentueren': [
          'DSC00852.jpg',
          'Gartentüre-aus-Flachstahl.jpg',
          'Gartentüre-mit-Briefkastenanlage.jpg',
          'Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg',
          'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg',
          'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg'
        ],
        'briefkastenanlagen': [
          'Briefkasten.jpg',
          'DSC01603.jpg',
          'Freistehender-Briefkasten.jpg',
          'Gartentüre-mit-Briefkastenanlage.jpg',
          'DSC01602.jpg'
        ],
        'sonderkonstruktionen': [
          'Blumenkübel-II.jpg',
          'Blumenkübel-I.jpg',
          'Holzregal.jpg',
          'Rampe-II-scaled-e1728295107225.jpeg',
          'Rollstuhlrampe-verzinkte-Ausführung.jpg',
          'Sichtschutz-Edelstahlleiste-Motivglas-I.jpg',
          'VA-Riffelblech.jpg',
          'Weinregal.jpg'
        ]
      };

      const images = imageMap[galleryName] || [];
      loadGalleryImagesFromList(images, imagePath, gallery);
    }
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
});

function loadAllGalleries(basePath, gallery) {
  const galleries = {
    'balkone': [
      'Balkongeländer-Milchglasfüllung.jpg',
      'Balkongeländer-MilchglasfüllungII.jpg',
      'Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg',
      'Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg',
      'Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg',
      'Balkongeländer-mit-satiniertem-Glas.jpg',
      'Verz.-Ausführung-Füllung-Trespaplatten-II.jpg',
      'Verzinkte-Ausführung-Füllung-Trespaplatten.jpg',
      'Verz.-Ausführung-Lochblechfüllung.jpg'
    ],
    'treppen': [
      'Stahlwangentreppe-mit-Podest.jpg',
      'Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg',
      'DSC01602.jpg',
      'IMG_0841-e1495619483297.jpg',
      'Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg',
      'TreppenhausfestverglasungI.jpg',
      'Riek-Treppe-1.jpg',
      'Riek-Treppe.jpg'
    ],
    'vordaecher': [
      'Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg',
      'DSC00235-1.jpg',
      'DSC01658-1.jpg',
      'DSC01659.jpg',
      'Edelstahlvordach-mit-Klarglasfüllung.jpg',
      'Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg',
      'Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg',
      'Terrassenüberdachung-verzinkte-Ausführung-I.jpg'
    ],
    'franzoesische-balkone': [
      'IMG_3310.jpg',
      'IMG_3311.jpg',
      'Edelstahl-mit-Klarglas-ohne-Handlauf.jpg',
      'TreppenhausfestverglasungI.jpg',
      'TreppenhausfestverglasungII.jpg'
    ],
    'gartentueren': [
      'DSC00852.jpg',
      'Gartentüre-aus-Flachstahl.jpg',
      'Gartentüre-mit-Briefkastenanlage.jpg',
      'Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg',
      'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg',
      'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg'
    ],
    'briefkastenanlagen': [
      'Briefkasten.jpg',
      'DSC01603.jpg',
      'Freistehender-Briefkasten.jpg',
      'Gartentüre-mit-Briefkastenanlage.jpg',
      'DSC01602.jpg'
    ],
    'sonderkonstruktionen': [
      'Blumenkübel-II.jpg',
      'Blumenkübel-I.jpg',
      'Holzregal.jpg',
      'Rampe-II-scaled-e1728295107225.jpeg',
      'Rollstuhlrampe-verzinkte-Ausführung.jpg',
      'Sichtschutz-Edelstahlleiste-Motivglas-I.jpg',
      'VA-Riffelblech.jpg',
      'Weinregal.jpg'
    ]
  };

  Object.entries(galleries).forEach(([name, images]) => {
    const imagePath = `${basePath}assets/images/galerie/${name}/`;
    loadGalleryImagesFromList(images, imagePath, gallery);
  });
}

function loadGalleryImagesFromList(images, imagePath, gallery) {
  images.forEach(filename => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = imagePath + filename;
    img.alt = filename.replace(/\.[^/.]+$/, '').replace(/-/g, ' ');
    figure.appendChild(img);
    gallery.appendChild(figure);
  });
}

