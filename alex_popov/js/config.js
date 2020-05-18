const config = {
    currency: '$',
    priceDelimiter: ','
};
// starting data
const products = [
    {
        id: 1,
        name: 'Cold Milk',
        email: 'mail@mail.ru',
        count: 56,
        price: 70.5,
        delivery: {
            'Russia': ['Moscow','Novosibirsk','Ekaterinburg' ,'Samara','Omsk','Kazan','Chelyabinsk'],
            'US': ['washington','Sietl','Buclin',  'Phoenix', 'Philadelphia'],
            'Japan': ['Tokyo','Osaka','Himeji', 'Hiroshima', 'Nagoya', 'Toyohashi', 'Okazaki', 'Ichinomiya', 'Seto', 'Handa','Kasugai'],
            'Sweden': ['Stocholm',  'Halmstad', 'Helsingborg', 'Härnösand', 'Karlshamn'],
            'Wales': ['Narberth', 'Neath', 'Emlyn', 'Newport', 'Newtown', 'Neyland' ],
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
        delivery: {
            
            'Belorus': ['Minsk','Narva', 'Mogilev', 'Vitebsk', 'Baranovichi', 'Borisov', 'Babruysk' ,'Brest'],
            'US': ['washington','Sietl','Buclin', 'Dallas', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
            'Japan': [ 'Nagoya', 'Toyohashi', 'Okazaki', 'Ichinomiya', 'Seto', 'Handa','Kasugai'],
            'Norway': ['Otta', 'Horten', 'Grimstad','Florø' ],
            'Wales': ['Narberth',  'Emlyn', 'Newport', 'Newtown', 'Neyland' ],
        }	
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
        delivery: {
            'Russia': ['Moscow','Voronezh','Orel', 'Ekaterinburg' ,'Samara','Omsk','Kazan','Chelyabinsk'],
            'Belorus': ['Minsk','Narva','Ghomel',  'Baranovichi', 'Pinsk','Borisov', 'Babruysk' ,'Brest'],
            'Norway': ['Oslo',  'Otta',  'Farsund', 'Gjøvik',  'Hamar', 'Horten', 'Grimstad','Florø' ],
            'Finland': ['Helsinki',  'Alajärvi', 'Espoo', 'Heinola', 'Imatra', 'Iisalmi', 'Hyvinkää', 'Huittinen'],
            'Wales': ['Narberth', 'Neath', 'Nefyn',  'Newtown', 'Neyland' ],
        }	
    }, {
        id: 6,
        name: 'Toy Train',
        email: 'mail2@mail.ru',
        count: 566,
        price: 560.35,
        delivery: false
    }
];
// information about cities and countries that are  avialible for elivery 
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