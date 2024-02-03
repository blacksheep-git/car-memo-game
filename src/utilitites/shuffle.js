const shuffle = () => {
    const assets = [
        { name: 'dart', image: './assets/bmw.png' },
        { name: 'html', image: './assets/benz.png' },
        { name: 'jquery', image: './assets/alpha.png' },
        { name: 'js', image: './assets/honda.png' },
        { name: 'next', image: './assets/skoda.png' },
        { name: 'node', image: './assets/mazda.png' },
        { name: 'react', image: './assets/subaru.png' },
        { name: 'ts', image: './assets/volvo.png' }
    ];
    return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }));
}

export default shuffle;