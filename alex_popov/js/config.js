const config = {
    key: '$2b$10$0rZLIDFGWOdXGdOc4n7HC.sqsisGH3VoH/BaqpmEZUG9GqnE0zKEi',
    fileId:'5e9615d8435f5604bb4165f3',
    currency: '$',
    priceDelimiter: ','
};

const products = [
    {
        id: 1,
        name: 'Milk',
        email: 'mail@mail.ru',
        count: 56,
        price: 70.5,
        delivery: {
            'Russia': [
                'Moscow'
            ],
            'Belorus': [
                'Minsk'
            ],
            'US': [
                'washington'
            ],
            'Japan': [
                'Tokyo',
                'Osaka',
                'Himeji'
            ],
            'China': [
                'Honkong'
            ],
            'Norway': [
                'Oslo',
                'Otta'
            ],
            'Finland': [
                'Oulu'
            ]
        }
    }, {
        id: 2,
        name: 'Chocklate',
        email: 'mail1@mail.ru',
        count: 300,
        price: 1000000.73,
        delivery: false
    }, {
        id: 3,
        name: 'Iphone 2',
        email: 'mail2@mail.ru',
        count: 57,
        price: 1500.57,
        delivery: false
    }, {
        id: 4,
        name: 'Intel Pentium 4',
        email: 'mail@mail.ru',
        count: 256,
        price: 1001,
        delivery: false
    }, {
        id: 5,
        name: 'Star Wars DVD',
        email: 'mail1@mail.ru',
        count: 350,
        price: 5140.2,
        delivery: false
    }, {
        id: 6,
        name: 'Toy Train',
        email: 'mail2@mail.ru',
        count: 566,
        price: 560.35,
        delivery: false
    }
];

const delivery = {
    'Russia': ['Moscow','Voronezh','Orel', 'StPetersburg','Novosibirsk','Ekaterinburg' ,'Samara','Omsk','Kazan','Chelyabinsk'],
    'Belorus': ['Minsk','Narva','Ghomel', 'Mogilev', 'Vitebsk', 'Grodno', 'Baranovichi', 'Pinsk','Borisov', 'Babruysk' ,'Brest'],
    'US': ['washington','Sietl','Buclin', 'Dallas', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
    'Japan': ['Tokyo','Osaka','Himeji', 'Hiroshima', 'Nagoya', 'Toyohashi', 'Okazaki', 'Ichinomiya', 'Seto', 'Handa','Kasugai'],
    'China': ['Honkong','Pekin','Guachzou','Macau' , 'Chongqing', 'Shanghai', 'Tianjin', 'Anqing'],
    'Sweden': ['Stocholm', 'Lindchopong', 'Geteborg', 'Gränna', 'Halmstad', 'Helsingborg', 'Härnösand', 'Karlshamn'],
    'Norway': ['Oslo', 'Bergen', 'Otta', 'Bodø', 'Farsund', 'Gjøvik', 'Harstad', 'Hamar', 'Horten', 'Grimstad','Florø' ],
    'Finland': ['Helsinki', 'Kouvola', 'Oulu', 'Alajärvi', 'Espoo', 'Heinola', 'Imatra', 'Iisalmi', 'Hyvinkää', 'Huittinen'],
    'Wales': ['Narberth', 'Neath', 'Nefyn', 'Newbridge', 'Newcastle', 'Emlyn', 'Newport', 'Newtown', 'Neyland' ],
}	