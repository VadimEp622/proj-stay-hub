import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STAY_STORAGE_KEY = 'stay'


const STAYS_TRUE_DEMO_TEMP = [
    {
        "_id": "622f337a75c7d36e498aaaf8",
        "name": "Westin Kaanapali KORVN 2BR",
        "type": "National parks",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg"
        ],
        "price": 595,
        "summary": "Westin Kaanapali Ocean Resort Villas North timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ \"The Space\" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.",
        "capacity": 8,
        "amenities": [
            "TV",
            "Cable TV",
            "Internet",
            "Wifi",
            "Air conditioning",
            "Wheelchair accessible",
            "Pool",
            "Kitchen",
            "Free parking on premises",
            "Doorman",
            "Gym",
            "Elevator",
            "Hot tub",
            "Heating",
            "Family/kid friendly",
            "Suitable for events",
            "Washer",
            "Dryer",
            "Smoke detector",
            "Carbon monoxide detector",
            "First aid kit",
            "Safety card",
            "Fire extinguisher",
            "Essentials",
            "Shampoo",
            "24-hour check-in",
            "Hangers",
            "Hair dryer",
            "Iron",
            "Laptop friendly workspace",
            "Self check-in",
            "Building staff",
            "Private entrance",
            "Room-darkening shades",
            "Hot water",
            "Bed linens",
            "Extra pillows and blankets",
            "Ethernet connection",
            "Luggage dropoff allowed",
            "Long term stays allowed",
            "Ground floor access",
            "Wide hallway clearance",
            "Step-free access",
            "Wide doorway",
            "Flat path to front door",
            "Well-lit path to entrance",
            "Disabled parking spot",
            "Step-free access",
            "Wide doorway",
            "Wide clearance to bed",
            "Step-free access",
            "Wide doorway",
            "Step-free access",
            "Wide entryway",
            "Waterfront",
            "Beachfront"
        ],
        "bathrooms": 2,
        "bedrooms": 2,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "622f3403e36c59e6164faf93",
            "fullname": "Patty And Beckett",
            "location": "Eureka, California, United States",
            "about": "Adventurous couple loves to travel :)",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_x_medium",
            "isSuperhost": true,
            "id": "36133410"
        },
        "loc": {
            "country": "United States",
            "countryCode": "US",
            "city": "Maui",
            "address": "Lahaina, HI, United States",
            "lat": -156.6917,
            "lan": 20.93792
        },
        "reviews": [
            {
                "at": "2016-06-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc004",
                    "fullname": "Kiesha",
                    "imgUrl": "https://robohash.org/10711825?set=set1",
                    "id": "10711825"
                },
                "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter."
            },
            {
                "at": "2016-07-28T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb204",
                    "fullname": "Chris",
                    "imgUrl": "https://robohash.org/70072865?set=set1",
                    "id": "70072865"
                },
                "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. "
            },
            {
                "at": "2016-09-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb703",
                    "fullname": "Kim",
                    "imgUrl": "https://robohash.org/71179725?set=set1",
                    "id": "71179725"
                },
                "txt": "We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves."
            },
            {
                "at": "2017-01-07T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb37f",
                    "fullname": "Tracy",
                    "imgUrl": "https://robohash.org/65593239?set=set1",
                    "id": "65593239"
                },
                "txt": "Beautiful location. Patty & Peter were super helpful and easy to work with!"
            },
            {
                "at": "2017-04-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb105",
                    "fullname": "Duyen",
                    "imgUrl": "https://robohash.org/26215688?set=set1",
                    "id": "26215688"
                },
                "txt": "Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back."
            },
            {
                "at": "2017-05-09T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fabbe",
                    "fullname": "Binh",
                    "imgUrl": "https://robohash.org/117390236?set=set1",
                    "id": "117390236"
                },
                "txt": "The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. "
            },
            {
                "at": "2018-02-24T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4af",
                    "fullname": "Samy",
                    "imgUrl": "https://robohash.org/15143517?set=set1",
                    "id": "15143517"
                },
                "txt": "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around."
            },
            {
                "at": "2018-06-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb87b",
                    "fullname": "Breanne",
                    "imgUrl": "https://robohash.org/78173091?set=set1",
                    "id": "78173091"
                },
                "txt": "This place was perfect for my family. We had plenty of room to spread out and the service could not have been any better"
            },
            {
                "at": "2018-06-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb713",
                    "fullname": "Kimberly",
                    "imgUrl": "https://robohash.org/100535039?set=set1",
                    "id": "100535039"
                },
                "txt": "We love Westin Kaanapalli"
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaaf9",
        "name": "Belle chambre à côté Metro Papineau",
        "type": "Campers",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg"
        ],
        "price": 30,
        "summary": "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Cartier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
        "capacity": 2,
        "amenities": [
            "TV",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Elevator",
            "Buzzer/wireless intercom",
            "Heating",
            "Family/kid friendly",
            "Washer",
            "Dryer",
            "Smoke detector",
            "Carbon monoxide detector",
            "Essentials",
            "Iron",
            "translation missing: en.hosting_amenity_50"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Private room",
        "host": {
            "_id": "622f3401e36c59e6164fabab",
            "fullname": "Angel",
            "location": "Montreal, Québec, Canada",
            "about": "",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "80344827"
        },
        "loc": {
            "country": "Canada",
            "countryCode": "CA",
            "city": "Montreal",
            "address": "Montréal, QC, Canada",
            "lat": -73.54985,
            "lan": 45.52797
        },
        "reviews": [
            {
                "at": "2016-07-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc058",
                    "fullname": "Rowan",
                    "imgUrl": "https://robohash.org/81703602?set=set1",
                    "id": "81703602"
                },
                "txt": "The place was great, as was the host! I would recommend staying here."
            },
            {
                "at": "2016-07-08T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb274",
                    "fullname": "Adriana",
                    "imgUrl": "https://robohash.org/64310987?set=set1",
                    "id": "64310987"
                },
                "txt": "J'ai adoré rester là. Très acceuillant."
            },
            {
                "at": "2016-07-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb87c",
                    "fullname": "Emma",
                    "imgUrl": "https://robohash.org/23709900?set=set1",
                    "id": "23709900"
                },
                "txt": "Angel est un hôte très sympa et arrangeant ! L'appartement est agréable à vivre et propre. Proche du métro et du centre ville. Nous avons passé un très bon séjour !"
            },
            {
                "at": "2016-08-02T04:00:00.000Z",
                "by": {
                    "_id": "622f3408e36c59e6164fc082",
                    "fullname": "Jeffery",
                    "imgUrl": "https://robohash.org/44882622?set=set1",
                    "id": "44882622"
                },
                "txt": "Angel was warm and welcoming and has a beautiful apartment. I'd recommend his place to anyone visiting downtown Montreal!"
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafa",
        "name": "M&M Space MM2  Apartamento no centro da cidade",
        "type": "Campers",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg"
        ],
        "price": 65,
        "summary": "O apartamento fica perto de arte e cultura e dos mais belos monumentos da cidade. Belos jardins e paisagens da cidade e do rio Douro ficam perto e podem ser apreciadas.  Existem restaurantes típicos e de comida internacional ao redor do apartamento.   O espaço fica numa rua típica da cidade, cheia da sua magia e magnetismo e é muito pratico e confortável. O espaço é excelente para quem pretende visitar e conhecer a zona histórica e turística do Porto. Transportes públicos ficam próximos.",
        "capacity": 4,
        "amenities": [
            "TV",
            "Cable TV",
            "Internet",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Paid parking off premises",
            "Free street parking",
            "Buzzer/wireless intercom",
            "Family/kid friendly",
            "Washer",
            "Smoke detector",
            "First aid kit",
            "Fire extinguisher",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "24-hour check-in",
            "Hangers",
            "Hair dryer",
            "Iron",
            "Laptop friendly workspace",
            "Private entrance",
            "Crib",
            "Room-darkening shades",
            "Hot water",
            "Bed linens",
            "Extra pillows and blankets",
            "Microwave",
            "Coffee maker",
            "Refrigerator",
            "Dishwasher",
            "Dishes and silverware",
            "Cooking basics",
            "Oven",
            "Stove",
            "Patio or balcony",
            "Luggage dropoff allowed",
            "Long term stays allowed",
            "Wide doorway",
            "Well-lit path to entrance",
            "Step-free access",
            "Wide doorway",
            "Accessible-height bed",
            "Step-free access",
            "Wide doorway",
            "Accessible-height toilet",
            "Step-free access",
            "Wide entryway",
            "Host greets you",
            "Handheld shower head",
            "Paid parking on premises",
            "Fixed grab bars for shower"
        ],
        "bathrooms": 1,
        "bedrooms": 2,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "622f3403e36c59e6164fb266",
            "fullname": "Maria",
            "location": "Porto, Porto District, Portugal",
            "about": "Simples, muito comunicativa, mas de elevado sentido de responsabilidade, de organização e de confiança.\r\nGosto muito de contacto humano, sem o qual não me sinto estável. Adoro conhecer pessoas de culturas diferentes.\r\nFaço várias viagens, mas de curta duração, pois tenho necessidade de sentir o lar e a família. Por ser assim, tento fazer tudo para que os meus hospedes se sintam confortáveis como em suas casas.",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_x_medium",
            "isSuperhost": true,
            "id": "78704763"
        },
        "loc": {
            "country": "Portugal",
            "countryCode": "PT",
            "city": "Porto",
            "address": "Porto, Porto, Portugal",
            "lat": -8.60154,
            "lan": 41.14834
        },
        "reviews": [
            {
                "at": "2016-07-18T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb090",
                    "fullname": "Lina & Alexis",
                    "imgUrl": "https://robohash.org/19177194?set=set1",
                    "id": "19177194"
                },
                "txt": "Mes parents ont passé un excellent séjour à Porto dans l'appartement de Maria qui est bien équipé, confortable et très propre. Il est situé au coeur du centre ville et tout est accessible à pied. Si vous venez en voiture, prévoir de se garer dans le parking souterrain payant juste à côté. Mes parents remercient chaudement Maria et son mari qui ont été adorables, notamment par leur accueil chaleureux."
            },
            {
                "at": "2016-08-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4e7",
                    "fullname": "Mario R.",
                    "imgUrl": "https://robohash.org/81211152?set=set1",
                    "id": "81211152"
                },
                "txt": "El apartamento es perfecto para una  estancia, esta perfectamente dotado para cubrir las necesidades de un viaje de recreo, situado perfectamente para acceder a pie a las zonas más interesantes de Oporto. María una perfecta anfitriona que te facilitará una inolvidable estancia en Oporto. Ha sido una gran experiencia."
            },
            {
                "at": "2016-08-14T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb110",
                    "fullname": "Patricia",
                    "imgUrl": "https://robohash.org/16580426?set=set1",
                    "id": "16580426"
                },
                "txt": "Thierry, Patricia, Anaïs et Manon,\r\nMaria et son mari nous attendaient avec gentillesse et sourires, Maria a toujours répondu à mes mails et SMS en cours de voyage.   Ils nous ont aidé à monter les valises, Il y avait une bouteille d'eau au frais, très appréciable ainsi que des petits gâteaux et une bouteille de vin dans le frigo...L'appartement était très propre rien ne manquait, conforme à la description, bien situé, nous avons tout fait à pieds ...Très à l'écoute de nos demandes Maria et son mari sont charmants, nous nous sommes sentis en famille, nous reviendrons et je recommande fortement ce logement ...Nous avons pu apprécier notre séjour sans tracas.  "
            },
            {
                "at": "2016-09-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab5b",
                    "fullname": "Ingrid",
                    "imgUrl": "https://robohash.org/40501338?set=set1",
                    "id": "40501338"
                },
                "txt": "Thanks Maria for your warm welcome. The appartement was really clean. It has everything that we needed for our stay and is really well located. It was easy to park for free near the appartement. Thanks!"
            },
            {
                "at": "2017-05-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb27c",
                    "fullname": "Marie Odile",
                    "imgUrl": "https://robohash.org/110925120?set=set1",
                    "id": "110925120"
                },
                "txt": "L appartement de Maria est tres bien situe, propre et surtout tres calme. Il ne manque rien . Maria nous a tres bien recus . Je recommande cet appartement."
            },
            {
                "at": "2017-06-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd3c",
                    "fullname": "Anne",
                    "imgUrl": "https://robohash.org/23040000?set=set1",
                    "id": "23040000"
                },
                "txt": "Maria is a great host and we loved this apartment! It was bright, clean, airy and well-equipped and Maria gave us a thorough introduction to how everything worked. The bed was comfortable (it is not made for tall people though) and nights were quiet as both living room and bedroom are facing the backyard, not the street. Only in the morning we could not sleep in as there was loud construction noise during the day. The metro station is only a few minutes walk away and the city center is at walking distance. We also got a sweet welcome with Portuguese wine."
            },
            {
                "at": "2017-06-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd39",
                    "fullname": "Armelle",
                    "imgUrl": "https://robohash.org/113337848?set=set1",
                    "id": "113337848"
                },
                "txt": "Appartement très bien situé, tout le vieux porto se fait à pied. Très propre, indépendant et fonctionnel. Metro au pied en venant de l'aéroport, ligne directe 15 minutes environ.\nRestaurants et épiceries typiques au pied de l'immeuble. Climatisation et télé dans toutes les pièces, calme et quartier pittoresque. À recommander pour 3 ou 4. Accueil simple, gentil et efficace comme Maria la propriétaire.\n"
            },
            {
                "at": "2017-08-01T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbc52",
                    "fullname": "Domingo",
                    "imgUrl": "https://robohash.org/114367498?set=set1",
                    "id": "114367498"
                },
                "txt": "apartamento bien situado, agradable, bonito, muy limpio y con una anfitriona maravillosa dispuesta a resolver cualquier inconveniente que se pueda presentar. lo recomiendo sin lugar a dudas.\ngracias Mariapor su gentileza"
            },
            {
                "at": "2017-08-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbb3f",
                    "fullname": "Estelle",
                    "imgUrl": "https://robohash.org/123999116?set=set1",
                    "id": "123999116"
                },
                "txt": "Appartement très propre et très bien situé, bien agencé. Quartier très vivant mais appartement calme car ne donne pas sur la rue. Nous avons passé un très bon séjour chez Maria qui nous a très bien accueilli."
            },
            {
                "at": "2017-09-21T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb06f",
                    "fullname": "Alfredo Julio Leandro",
                    "imgUrl": "https://robohash.org/148979666?set=set1",
                    "id": "148979666"
                },
                "txt": "Apartamento agradable, muy limpio y muy bien equipado, en zona tranquila pero accesible para llegar a todos lados de a pie. Maria y Arturo nos recibieron con un rico vino del Douro y galletitas y muy buenas recomendaciones para pasear y comer."
            },
            {
                "at": "2017-10-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb78f",
                    "fullname": "Nataliia",
                    "imgUrl": "https://robohash.org/137603514?set=set1",
                    "id": "137603514"
                },
                "txt": "Нам очень понравилась квартира,светлая,уютная,на 3-м этаже,с большим балконом,в квартире есть все самое необходимое,стиральная машина,утюг,кровати очень удобные,красивое постельное белье,вся обстановка в квартире сделана с душой,все время прибывания чувствовали себя как дома.\nМария по приезду подарила нам бутылку вина из долины реки Дору,из красивых бокалов мы его с удовольствием выпили,спасибо за презент.\nВ этой маленькой уютной квартире -3 телевизора!!!!Смотреть было некогда,наслаждались красивым городом и окрестностями Порту."
            },
            {
                "at": "2017-12-09T05:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fad62",
                    "fullname": "Liz",
                    "imgUrl": "https://robohash.org/144054479?set=set1",
                    "id": "144054479"
                },
                "txt": "Muy contentos con todo. El piso estaba bastante cerca del centro, Maria y su marido estaban incluso antes de la hora de nuestra llegada. El piso esta muy bien equipado: cafetera, botiquín, lavadora etc. Super super limpio todo y las camas muy comodas y acogedores. Y al ser un piso interior, no se oia nada de ruido. Recomendable!"
            },
            {
                "at": "2018-01-09T05:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb1c3",
                    "fullname": "Ariadne",
                    "imgUrl": "https://robohash.org/151785573?set=set1",
                    "id": "151785573"
                },
                "txt": "Eu e minha amiga ficamos um mês no apartamento e foi uma otima experiencia!\nMuito bem localizado, perto de tudo! Não tivemos nenhuma dificuldade em encontrar o local, que fica a minutos da estação do metrô e é muito perto da região central.\nÓtima infraestrutura, limpeza e organização.\nFomos muito bem recebidas e bem auxiliadas pela Maria, que com certeza é uma ótima anfitriã!\nRecomendo muito a estadia, não poderia ter sido melhor!"
            },
            {
                "at": "2018-02-27T05:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb5f5",
                    "fullname": "Bruno",
                    "imgUrl": "https://robohash.org/169584809?set=set1",
                    "id": "169584809"
                },
                "txt": "Respostas sempre rápidas; excelente recepção ; sempre simpática e disponível."
            },
            {
                "at": "2018-06-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fad10",
                    "fullname": "João",
                    "imgUrl": "https://robohash.org/43281546?set=set1",
                    "id": "43281546"
                },
                "txt": "Clean, quiet and centrally located. Very welcoming host as well."
            },
            {
                "at": "2018-07-18T04:00:00.000Z",
                "by": {
                    "_id": "622f3408e36c59e6164fc075",
                    "fullname": "Alcides",
                    "imgUrl": "https://robohash.org/22956972?set=set1",
                    "id": "22956972"
                },
                "txt": "O Espaço de Maria é de extremo bom gosto. Tudo extremamente limpo, pratico e organizado nos mínimos detalhes.  Boa localização perto de tudo.  Sem falar na Simpatia e disponibilidade da Maria que com suas dicas tornou nossa estadia em Porto melhor do que esperávamos. Recomendadíssimo !"
            },
            {
                "at": "2018-12-09T05:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbad8",
                    "fullname": "Miguel Angel",
                    "imgUrl": "https://robohash.org/3708225?set=set1",
                    "id": "3708225"
                },
                "txt": "Alojamiento coqueto y acogedor, muy limpio y bien ubicado, tiene 2 habitaciones y todo lo necesario para poder pasar unos días en Oporto, buena ubicación cerca de Sta Catarina. Nos ha gustado mucho la estancia, la atención de María inmejorable. Muchas gracias por su atención y amabilidad"
            },
            {
                "at": "2018-12-29T05:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbede",
                    "fullname": "Alessandro",
                    "imgUrl": "https://robohash.org/38271990?set=set1",
                    "id": "38271990"
                },
                "txt": "buena ubicación, piso acogedor, reformado, excelente servicio y recomendaciones"
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafb",
        "name": "Fresh and modern 1BR in Bed-Stuy",
        "type": "National parks",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg"
        ],
        "price": 79,
        "summary": "A spacious, art-filled one-bedroom apartment near the express train (28 minutes to Times Square) and a Citibike station. Sample Bed-Stuy life at a nearby French restaurant,  a sunny Haitian cafe, a boutique grocery and more. We do NOT discriminate based on race, religion or sexual orientation.",
        "capacity": 2,
        "amenities": [
            "Internet",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Heating",
            "Family/kid friendly",
            "Smoke detector",
            "Carbon monoxide detector",
            "Fire extinguisher",
            "Essentials",
            "Shampoo",
            "24-hour check-in",
            "Hangers",
            "Hair dryer",
            "Iron",
            "Laptop friendly workspace",
            "translation missing: en.hosting_amenity_49",
            "Self check-in",
            "Lockbox"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "622f3402e36c59e6164fac46",
            "fullname": "Shaila & Alex",
            "location": "New York, New York, United States",
            "about": "I'm a journalist from Texas and my husband is an artist from the Ukraine by way of Kansas City. We recently welcomed our son into the world. (Don't worry, he sleeps all night.)  We love exploring New York, especially Brooklyn, from the Brooklyn Flea to tiny taco joints to the Botanic Gardens to performance art in Bushwick storefronts (really). We've both spent a lot of time in the South, so hospitality is second nature to us. ",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_x_medium",
            "isSuperhost": true,
            "id": "6334250"
        },
        "loc": {
            "country": "United States",
            "countryCode": "US",
            "city": "New York",
            "address": "Brooklyn, NY, United States",
            "lat": -73.92922,
            "lan": 40.68683
        },
        "reviews": [
            {
                "at": "2013-05-27T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbfd2",
                    "fullname": "Nicolas",
                    "imgUrl": "https://robohash.org/4523027?set=set1",
                    "id": "4523027"
                },
                "txt": "Shaila's place is amazing! It's new, it's clean and it's big! And Shaila is very accommodating, we found everything we needed (cooking, coffee) and more. Given that we were the first guests she hosted through airbnb I can say that she did an amazing job! \r\n"
            },
            {
                "at": "2013-06-04T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb048",
                    "fullname": "Jeff",
                    "imgUrl": "https://robohash.org/6443424?set=set1",
                    "id": "6443424"
                },
                "txt": "Great, quiet place to stay. It is great having Shaila just upstairs to answer any questions, and especially to give great tips on places to go. "
            },
            {
                "at": "2013-06-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fba55",
                    "fullname": "Carla",
                    "imgUrl": "https://robohash.org/6121036?set=set1",
                    "id": "6121036"
                },
                "txt": "Shaila and Alex are wonderful hosts really, they helped us every time we needed with directions, the internet, the supermarket, the post office !!! (thank you guys !!!).The place and the neighbord are great, 8 blocks far from the apartment you have the subway and 30 min. later you are in the island, we moved early in the morning, late at night (sometimes we came back at 2am) and everything turned out great.Definetly I would come back to their apartment, It's bigger than ours in Argentina !!! I look forward to stay there again and, next time, go out with you guys and have a beer or anything.\r\nBye !!! - Guido and Carla - "
            },
            {
                "at": "2013-06-20T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbf76",
                    "fullname": "Dan",
                    "imgUrl": "https://robohash.org/6460525?set=set1",
                    "id": "6460525"
                },
                "txt": "Shaila and Alex were incredibly accommodating and me and my girlfriend enjoyed our stay thoroughly. Highly recommended. The place was very private and homely. I didn't really know anything about New York and was nervous about staying in bed stuy but it was safe and friendly everywhere I went. Very easy to get to the airport and manhattan by train."
            },
            {
                "at": "2013-06-25T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbe9d",
                    "fullname": "Ariane",
                    "imgUrl": "https://robohash.org/6825718?set=set1",
                    "id": "6825718"
                },
                "txt": "Great place to stay in Brooklyn! Alex gave us a really useful list of nice restaurants and coffee places near the place (We are very happy to have discovered, the restaurant \"Saraghina\", thanks to Alex's map!).  The apartment is vast, furnished with taste and very convenient. We highly recommend!"
            },
            {
                "at": "2013-07-03T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fad91",
                    "fullname": "Ilka",
                    "imgUrl": "https://robohash.org/5823882?set=set1",
                    "id": "5823882"
                },
                "txt": "I can recommend to everyone to come to this beautiful apartment, Shaila and Alex are great hosts and the neighbourhood is very friendly everywhere we go.\r\nIt really felt like home."
            },
            {
                "at": "2013-07-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab81",
                    "fullname": "Kristy",
                    "imgUrl": "https://robohash.org/5729991?set=set1",
                    "id": "5729991"
                },
                "txt": "My sister and I loved staying here! The apartment is very spacious and recently renovated so it looks amazing. The kitchen has everything you need with Alex and Shalia stocking it with a few basics. The neighbourhood is a little shabby, especially compared to the home we stayed in. We were told by some people in Manhattan that the neighbour of Bed-Stuy used to be very dangerous and just to be careful walking around at night. Walking from the subway after dark was a little daunting but we remained safe. We did catch a cab a few times from Manhattan as it was very late. Overall, it was a positive experience with Alex and Shalia being very helpful, even going out of their way to let us store our luggage at Shalia's work the day we were to fly out. They were great hosts."
            },
            {
                "at": "2013-07-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb785",
                    "fullname": "Barbara",
                    "imgUrl": "https://robohash.org/6063814?set=set1",
                    "id": "6063814"
                },
                "txt": "We just met Alex when we checked in, but anyhow he had been a very friendly and helpful host. He was reachable anytime and answered my mails prompt.\r\nThe apartment was great! It was really beautiful and big. It has a perfectly equipped kitchen and there are also a few basics for breakfast and cooking. The bed is very comfortable. It is not that soundproofed as we are accustomed to (the steps from upstairs waked me every day - my son slept well, he did not hear it), but I think that is normal for american houses. But apart from this it is very quiet.\r\nThe neighbourhood is great! It is very authentic, people are friendly and helpful if required, no problems even late at night. We loved staying there!\r\nIn any case: apartment, host and neighbourhood are high recommended! If we are in New York again, we certainly return to this place!"
            },
            {
                "at": "2013-07-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb515",
                    "fullname": "Gloria",
                    "imgUrl": "https://robohash.org/97251?set=set1",
                    "id": "97251"
                },
                "txt": "Hello! \n\nWe just spent 5 days in the big apple and we drove in to this Brooklyn location.  The host where incredibly attentive and just wonderful, the apartment spotless, hip & modern and really comfortable. \n\nDo not be intimidated by the transitioning neighborhood as we encountered that many residents are very friendly and helpful (directions) and this particular street has a real interest in making a real change hence empowering their community.\n\nThe subway is a little ways (12 to 15 min.) walk. We would use our vehicle to drive to the subway station (there are two corresponding)  and park nearby to facilitate the to and from.  If you need quick access to the subway at all hours of the day and night this may not be the place for you.\n\nThe apt. is an excellent value  for the money (as per  many  manhattan locations offer around  the same nightly  $$ rate but have to share their apt ).\n\n\n\n"
            },
            {
                "at": "2013-09-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb079",
                    "fullname": "Javier",
                    "imgUrl": "https://robohash.org/7055720?set=set1",
                    "id": "7055720"
                },
                "txt": "We really had a wonderful time in NYC thanks to Alex’s house. It’s just as big, beautiful and clean as it seems in the pictures. Alex has an incredible apartment in the basement that makes you feel like home after being out all day knowing the big city. All the furniture and the kitchen appliances are new.\r\n\r\nThe location is perfect for visiting Brooklyn and Manhattan (only 15-20 to Brooklyn Bridge and South Manhattan or 25-30 min to Times Square in the underground).\r\n\r\nAlso, Alex gave us some good advices the first day for having all we needed in the neighbourhood. Don’t miss Saraghina’s brunch (10 minutes walking from the house)! He even let us to keep our luggage in the house until we left to the airport in the evening on our last day in the city."
            },
            {
                "at": "2013-10-09T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fabc4",
                    "fullname": "Ivan",
                    "imgUrl": "https://robohash.org/8866660?set=set1",
                    "id": "8866660"
                },
                "txt": "The appartment was really clean, pretty spacious and kitchen was very well equipped! Its totally in line with all the information posted. \r\n\r\nAlex was very nice host, even allowed us to keep the luggage  after check out as we had a flight in the evening. Thank you once again for that! \r\n\r\nThe neighboorhood itself was safe, we had no issues at all, however I`d prefer staying   in Brooklyn districts closer to Manhattan area next time as  we were travelling to Midtown up to 1h. Being a citizen of the huge city too (Moscow, Russia) , underground is not our favorite place to be  :) \r\n\r\nOverall , it was a great stay. \r\n\r\n\r\n\r\n"
            },
            {
                "at": "2013-11-01T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fada2",
                    "fullname": "India",
                    "imgUrl": "https://robohash.org/228580?set=set1",
                    "id": "228580"
                },
                "txt": "Communication with Alex was spot on.  He happily answered any questions and made it easy for me to arrive late at night and went above and beyond to help me have a good stay. \r\nThe apartment has been tastefully refurbished.  Extremely clean, and with all you could need for cooking.  The bed is so comfy.  The apartment is peaceful at night and I slept so well.   Some noise travels from Alex' apartment upstairs but it is only a little during the day.\r\nThe area is a bit out of the main hub of Williamsburg and Bushwick but everything is easily accessible with a short walk or the subway about 8 mins walk away.\r\nAlex left me a list of great stores, cafes and restaurants in the immediate area.  \r\nSome people may be concerned about the area at face value as it is a white minority but I felt safe at all times.  People seemed friendly.\r\n\r\n"
            },
            {
                "at": "2013-11-10T05:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fb9f9",
                    "fullname": "Pamela",
                    "imgUrl": "https://robohash.org/8145538?set=set1",
                    "id": "8145538"
                },
                "txt": "Was an amazing stay, we charm your apartment and were very friendly. Thank you for all your attentions."
            },
            {
                "at": "2013-11-14T05:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fae8c",
                    "fullname": "Lindsay",
                    "imgUrl": "https://robohash.org/979464?set=set1",
                    "id": "979464"
                },
                "txt": "Shaila and Alex are wonderful hosts - very accommodating, friendly, and easy to communicate with. We found it fairly easy to get around the city from Bed-Stuy, even with the weekend subway schedule. The apartment is lovely, bright, and very clean, and overall it was a pleasure to stay for a few nights. It's been recently renovated and thoughtfully decorated - we felt quite comfortable during our stay and appreciated the art and other nice touches throughout. I'd highly recommend staying with Shaila and Alex."
            },
            {
                "at": "2013-12-01T05:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbf31",
                    "fullname": "Nadia",
                    "imgUrl": "https://robohash.org/1133198?set=set1",
                    "id": "1133198"
                },
                "txt": "Great apartment, really spacious & has a lovely homely feel to it. Alex & Shaila were very helpful & welcoming, bed was really comfortable, good transport links, only a 20 min subway ride into manhattan, the area is really nice & quiet, unlike manhattan.\r\n\r\nThanks Alex & Shaila for having us ! Enjoy the Gin !! "
            },
            {
                "at": "2014-01-04T05:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdab",
                    "fullname": "Barbara",
                    "imgUrl": "https://robohash.org/8310069?set=set1",
                    "id": "8310069"
                },
                "txt": "The apartment is spacious and well furnished, the kitchen very well equipped and the bed very confortable. Sheila and alex were friendly and the comunication with them was easy.the neighborhood is very nice with typical town house, and very quite. Also the people Who lives there was very kind and helped us on many occasion. \nDefinitely raccommend you to spend your holidays in NY in the lovely apartment of sheila&alex! "
            },
            {
                "at": "2014-03-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb2c1",
                    "fullname": "Chris",
                    "imgUrl": "https://robohash.org/9935301?set=set1",
                    "id": "9935301"
                },
                "txt": "We had a great time staying with Alex & Shaila. The apartment is just as depicted in the photos. Lots of space and very comfortable.  The house is located really close to buses and subway which was very convenient. The neighbourhood is fine with a couple of nice places to eat nearby.\r\n\r\nShaila and alex were really friendly and easy to communicate with if needed.  \r\n\r\nWe stayed for 2 months and would recommend it to others who are looking for a place in Brooklyn."
            },
            {
                "at": "2014-03-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb8fc",
                    "fullname": "Melody",
                    "imgUrl": "https://robohash.org/11278447?set=set1",
                    "id": "11278447"
                },
                "txt": "Upon arriving, Alex was very helpful giving directions to the location. , he gave us a brief overview of everything, and let us settle in. It was a very cozy place to come back to after long days out exploring New York. The subways are very close. We preferred heading up to broadway to catch our trains (Depending where we were going) only because it was much more pleasant on sunny days to be above grounds if we could. It was great to have all amenities available, and at such a reasonable price.The only thing I will mention is that if you do plan on sleeping in- it might not happen as they do have a newborn who you can sometimes hear in the morning if you are a light sleeper.\r\nOverall,  I would recommend you stay at Alex & Shailas airbnb! It was a great and pleasant environment."
            },
            {
                "at": "2014-04-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb41e",
                    "fullname": "Carlos",
                    "imgUrl": "https://robohash.org/13281573?set=set1",
                    "id": "13281573"
                },
                "txt": "We felt very happy those days at the home of Alex and Shaila. It is a very warm and comfortable place, it was like being at home."
            },
            {
                "at": "2014-04-21T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb087",
                    "fullname": "Sergei",
                    "imgUrl": "https://robohash.org/13487808?set=set1",
                    "id": "13487808"
                },
                "txt": "Great host. Very clean, nice place and friendly people. Thanks again!"
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafc",
        "name": "Habitación centro de Barcelona",
        "type": "Shared homes",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg"
        ],
        "price": 40,
        "summary": "Mi piso está en el centro de Barcelona. Cerca del metro, las ramblas, los museos, el Portal del Ángel, Plaza Cataluña. Mi alojamiento es bueno para turistas, aventureros, y viajeros de negocios....y tiene ascensor.",
        "capacity": 2,
        "amenities": [
            "Wifi",
            "Kitchen",
            "Doorman",
            "Elevator",
            "Buzzer/wireless intercom",
            "Heating",
            "Essentials",
            "Hangers",
            "Hair dryer",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Private room",
        "host": {
            "_id": "622f3407e36c59e6164fbdae",
            "fullname": "Marián",
            "location": "Barcelona, Catalonia, Spain",
            "about": "",
            "thumbnailUrl": "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "31635864"
        },
        "loc": {
            "country": "Spain",
            "countryCode": "ES",
            "city": "Barcelona",
            "address": "Barcelona, Catalunya, Spain",
            "lat": 2.16685,
            "lan": 41.38371
        },
        "reviews": [
            {
                "at": "2016-07-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbebb",
                    "fullname": "Rafaela",
                    "imgUrl": "https://robohash.org/65117711?set=set1",
                    "id": "65117711"
                },
                "txt": "Host: Marian gave us a warm welcome and treated us kindly from the very beginning. She offered us help, told us what to visit and even put water, milk and orange juice in the fridge! We could have breakfast at her place which was perfect because she has a little sweet balcony! \r\nLocation: calmly situated in a side street, very near to the Placa Catalunya, the Rambla and the gothic area of Barcelona (very beautiful:)) so you have the old cultural center as well as all the restaurants and bars just nearby.\r\nHouse/Room: the appartment is not a huge, but I think you have everything you need (beautiful sitting room, balcony, kitchen) in it. You have to share the appartment with Marian so pay attention and don't be too loud in the evening!!\r\ndisadvantage: the heat is terrible in summer and there is no air-condition..\r\n\r\nI would overall recommend it to everybody!! But if you want to party and stay up late, take a hostel or another appartment."
            },
            {
                "at": "2016-08-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164faf56",
                    "fullname": "Pauline",
                    "imgUrl": "https://robohash.org/50303773?set=set1",
                    "id": "50303773"
                },
                "txt": "Nous avons passé un bon séjour, l'appartement est très bien situé. La chambre est agréable et plus grande que sur la photo. Seul point négatif pas de volets dans la chambre. "
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafd",
        "name": "DOUBLE ROOM IN THE HEART OF BCN",
        "type": "Amazing views",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg"
        ],
        "price": 25,
        "summary": "Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park",
        "capacity": 2,
        "amenities": [
            "Wifi",
            "Kitchen",
            "Paid parking off premises",
            "Smoking allowed",
            "Heating",
            "Washer",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "Hangers",
            "Hair dryer",
            "Iron",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50",
            "Hot water",
            "Bed linens",
            "Host greets you"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Private room",
        "host": {
            "_id": "622f3404e36c59e6164fb63a",
            "fullname": "Isabel",
            "location": "Barcelona, Catalonia, Spain",
            "about": "Mi nombre es Isabel, pero me llamo Isa. Nací en Vigo (Galicia). Con 20 años me fuí a vivir a Madrid con intención de ser actriz; ahora resido en Barcelona desde los 28. Soy una joven de 43 años, cantante de Jazz. Me gusta salir, pero también quedarme en casa a leer o ver alguna buena película.\r\nHe compartido piso muchos años, pero estas serán mis primeras experiencias como anfitriona.\r\n\r\n¡Sed bienvenidos!\r\n",
            "responseTime": "within an hour",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "35858044"
        },
        "loc": {
            "country": "Spain",
            "countryCode": "ES",
            "city": "Barcelona",
            "address": "Barcelona, Catalonia, Spain",
            "lat": 2.17561,
            "lan": 41.38701
        },
        "reviews": [
            {
                "at": "2016-02-24T05:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb95e",
                    "fullname": "Pierre",
                    "imgUrl": "https://robohash.org/58999873?set=set1",
                    "id": "58999873"
                },
                "txt": "Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión."
            },
            {
                "at": "2016-03-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fafa6",
                    "fullname": "Isabelle",
                    "imgUrl": "https://robohash.org/26247027?set=set1",
                    "id": "26247027"
                },
                "txt": "The host canceled this reservation 2 days before arrival. This is an automated posting."
            },
            {
                "at": "2016-04-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbaf2",
                    "fullname": "Hélène",
                    "imgUrl": "https://robohash.org/46103953?set=set1",
                    "id": "46103953"
                },
                "txt": "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !"
            },
            {
                "at": "2016-04-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdc3",
                    "fullname": "Daniel",
                    "imgUrl": "https://robohash.org/25801559?set=set1",
                    "id": "25801559"
                },
                "txt": "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep"
            },
            {
                "at": "2016-04-25T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fabad",
                    "fullname": "Maria Isabel",
                    "imgUrl": "https://robohash.org/60712702?set=set1",
                    "id": "60712702"
                },
                "txt": "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone."
            },
            {
                "at": "2016-05-04T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb967",
                    "fullname": "Aitana",
                    "imgUrl": "https://robohash.org/53206905?set=set1",
                    "id": "53206905"
                },
                "txt": "Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda."
            },
            {
                "at": "2016-05-12T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbb88",
                    "fullname": "Valentina",
                    "imgUrl": "https://robohash.org/69740054?set=set1",
                    "id": "69740054"
                },
                "txt": "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!"
            },
            {
                "at": "2016-05-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb715",
                    "fullname": "Jeremy",
                    "imgUrl": "https://robohash.org/53581405?set=set1",
                    "id": "53581405"
                },
                "txt": "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. "
            },
            {
                "at": "2016-05-25T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb0b2",
                    "fullname": "Mei-Lin",
                    "imgUrl": "https://robohash.org/40994614?set=set1",
                    "id": "40994614"
                },
                "txt": "Great room with lots of sunlight in a charming apartment. Fantastic location."
            },
            {
                "at": "2016-06-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb1f7",
                    "fullname": "Taneli",
                    "imgUrl": "https://robohash.org/8010736?set=set1",
                    "id": "8010736"
                },
                "txt": "Isa was a kind and gracious host with a lovely appartment in a centric and vibrant area. We loved our stay and surely will visit again."
            },
            {
                "at": "2016-06-16T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb623",
                    "fullname": "Natasha",
                    "imgUrl": "https://robohash.org/25592253?set=set1",
                    "id": "25592253"
                },
                "txt": "SUPER cute place with lots of charm!! Perfect for my first trip to Barcelona:) Amazing location! Gracias Isabel for helping me find last minute accommodations! \r\n"
            },
            {
                "at": "2016-06-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc013",
                    "fullname": "Elizabeth",
                    "imgUrl": "https://robohash.org/78467282?set=set1",
                    "id": "78467282"
                },
                "txt": "Isabel was a great host. She met me at the local bar where she worked and took me to her home a street away. The flight of stairs up to here place was a bit daunting but I can see why she lives up there.. It was beautiful! The room and whole place was clean, tidy and very welcoming. I saw Isabel twice, when I arrived and when I left, but it was perfect. \n\nThe facilities were great. The pressure in the shower was weak but it didn't bother me one bit. It is a bit noisy being in the heart of the city, but I can imagine it would be anywhere in this area. It was lovely to have a balcony, and the location was very convenient. Thanks.x"
            },
            {
                "at": "2016-06-28T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb0af",
                    "fullname": "Monika",
                    "imgUrl": "https://robohash.org/11966400?set=set1",
                    "id": "11966400"
                },
                "txt": "Isabel was good host. Location is perfect."
            },
            {
                "at": "2016-07-03T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb23a",
                    "fullname": "Margaux",
                    "imgUrl": "https://robohash.org/78589438?set=set1",
                    "id": "78589438"
                },
                "txt": "Super piso, super barrio! \r\nThe guest welcomed us well."
            },
            {
                "at": "2016-07-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb21c",
                    "fullname": "Elisabeth",
                    "imgUrl": "https://robohash.org/4965921?set=set1",
                    "id": "4965921"
                },
                "txt": "It was really nice to stay at Isabels place. She is very uncomplicated and nice and the flat is super located for exploring bcn. For me it was perfect!:)"
            },
            {
                "at": "2016-07-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd7f",
                    "fullname": "Ingrid",
                    "imgUrl": "https://robohash.org/6058273?set=set1",
                    "id": "6058273"
                },
                "txt": "IT was the perfect stay to Discover the city-a super location with sometimes noisy tourists (even we we're tourists but hopefully not so noisy) but that's part of the location i guess :-). We loved the colourful house and we Will Be go back for a next stay. thank you!"
            },
            {
                "at": "2016-07-30T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb1ac",
                    "fullname": "Liliane",
                    "imgUrl": "https://robohash.org/27060110?set=set1",
                    "id": "27060110"
                },
                "txt": "Isa is a very lovely, sensitive, artistic and gorgeous person. She is respectful of one's privacy but always ready to give support when asked upon. Be it in spoken or written form I always got my answers from her within no times. She also proofed to be very flexible in terms of arrival and departure times which I appreciated a great deal. If you are a fan of jazz music (like I am), make sure to double check ahead of time about her current concert dates so as not to miss your hostess on stage like I did (grumble ;-)).\n\nThe room I occupied was the smaller one of two that Isabel rents out. So if her flat is fully rented out there can be a maximum of 4 guests plus your hostess in the flat, which can cause some bathroom jam, especially during the hot and humid summer times, when the need for a cool shower is inherent to everyone's desire. \nMy room was as depicted. If you plan on using it for double occupancy, I recommend taking Isa's larger room (unless the two of you are very much in love and want to cuddle up close ;-)). Also, if you need a table for writing, ask for the larger room as well, which comes along with one.\nThe flat itself is absolutely enchanting and furnished with love and an artistic eye to details. It's location is a dream for touristic explorations with anything within walking distance. \nTherefore, I can easily recommend both Isabel and her flat to anyone wishing to immerge himself into the local customs and get a good doze of what it is like \"to live like a true Barcelonian\".  \n\nQuerida Isa, muchas gracias por tu hospedalid génial! Volveré a ciencia cierta!\nSaludos y besos\nLiliana"
            },
            {
                "at": "2016-08-10T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb8e1",
                    "fullname": "Murat",
                    "imgUrl": "https://robohash.org/35246459?set=set1",
                    "id": "35246459"
                },
                "txt": "The apartment is very centrally located, in the heart of the gothic part of the city and a couple of blocks from the Placa de Catalunya which makes transportation and sightseeing very easy. It's a 20 minute walk from the beach which is a plus. It's located in a very old building on the top floor, so it is rather stuffy and warm in the apartment. The room overlooks a very narrow street/alley so it's rather dark and it's easy to hear the noise coming from the street and the neighboring apartments. There are a few other rooms in the house that are being rented out, so other people will be staying in the house which makes it a necessity to lock the room when you leave the apartment. \n\nIt's important to note that this place has a very strict check out time. On our last day, we had an evening flight but had to check out in the morning. When we asked if we could check out late, Isa told us to take our stuff to the train station and use the lockers there, but the train station does not have lockers. We ended up renting a locker  at a place called \"Barcelona lockers\". That, I would say changed all the plans for the last day. \n\n"
            },
            {
                "at": "2016-08-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbcb4",
                    "fullname": "Mina",
                    "imgUrl": "https://robohash.org/121053?set=set1",
                    "id": "121053"
                },
                "txt": "I was happy to experience Isabels home as described here. It was spacious, bright and original, with lovely colours and beautiful artwork surrounding me in every room. Isabel is a creative, sensitive and respectful person, with an open mind- yet she has the necessary boundaries that are required to organize an environment where so many different people are going to stay and hopefully enjoy. \nThe street itself is very lively, but the noises didn't bother me at all as i could easily block them out with earplugs. The location could not have been more sentral, still it's on \"the right side\" of the Rambla, where you can find more independent shops, restaurants, cafes and bars compared to the same leveled streets towards Raval. It is an old and very charming building, so if you want an minimalistic experience with cold, stainless steel and elevators this is not the place for you! And perhaps you are not the right person for this place either ;) I had to leave earlier due to illness, and was so sorry i couldn't stay throughout the whole month as planned. Hope to be seeing Isabel and her welcoming surroundings again one day "
            },
            {
                "at": "2016-09-07T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb85f",
                    "fullname": "Jessy",
                    "imgUrl": "https://robohash.org/2935800?set=set1",
                    "id": "2935800"
                },
                "txt": "Isabel was an amazing host. She is incredible and super considerate. The apartment was by no means the best location in Barcelona, I walked everywhere and never needed a map or a taxi. Arriving late at night was always fine and there was never any disturbing street noise. The block is super cute with awesome little shops that are open during the day. Best neighborhood to be in and incredible city ! Muchísima gracias Isabel, estas invitada a visitar Los Ángeles, todo fue increíble !❤️"
            }
        ],
        "likedByUsers": []
    },
    {
        "_id": "622f337a75c7d36e498aaafe",
        "name": "Home, Sweet, Harlem. Welcome!",
        "type": "Beach",
        "imgUrls": [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg"
        ],
        "price": 110,
        "summary": "Welcome! Upgrades Added as of January 2018 This listing is located in the Spanish Harlem Section of Manhattan. I offer a cozy apartment that has great transportation in and out the city! The area has a lot of ethnic restaurants and a lot of local, active residents. This residence is great for a quick, inexpensive stay in New York whether its for business, travel, or personal purposes. I am glad to welcome all guests!",
        "capacity": 3,
        "amenities": [
            "TV",
            "Wifi",
            "Air conditioning",
            "Kitchen",
            "Free street parking",
            "Heating",
            "Smoke detector",
            "Carbon monoxide detector",
            "Essentials",
            "Shampoo",
            "Lock on bedroom door",
            "Hangers",
            "Iron",
            "Laptop friendly workspace",
            "translation missing: en.hosting_amenity_49",
            "translation missing: en.hosting_amenity_50",
            "Private living room",
            "Hot water",
            "Bed linens",
            "Extra pillows and blankets",
            "Refrigerator",
            "Dishes and silverware",
            "Cooking basics",
            "Oven",
            "Stove",
            "Host greets you"
        ],
        "bathrooms": 1,
        "bedrooms": 1,
        "roomType": "Entire home/apt",
        "host": {
            "_id": "622f3405e36c59e6164fb914",
            "fullname": "Kevin",
            "location": "New York, New York, United States",
            "about": "Welcome Everyone! Thank you for stopping by. \r\n\r\nI was born and raised in Manhattan and I am here to help  share the New York City Experience with others through Airbnb!  I am easy to connect with and very reachable and always willing to interact with people. \r\n\r\nI am big on cleanliness and hospitality. I strive on making Guests feel as comfortable as possible. \r\n\r\nI hope you would like to get a chance to visit my location and enjoy the hosting I provide. If you have any questions/ comments, feel free to contact me. \r\n",
            "responseTime": "within a few hours",
            "thumbnailUrl": "https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_small",
            "pictureUrl": "https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_x_medium",
            "isSuperhost": false,
            "id": "24800102"
        },
        "loc": {
            "country": "United States",
            "countryCode": "US",
            "city": "New York",
            "address": "New York, NY, United States",
            "lat": -73.93955,
            "lan": 40.79733
        },
        "reviews": [
            {
                "at": "2016-03-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb8b4",
                    "fullname": "Christine",
                    "imgUrl": "https://robohash.org/47877926?set=set1",
                    "id": "47877926"
                },
                "txt": "Kevin was very welcoming and thorough with all information. The description of the property was accurate. It's also near the MTA if you want to get to another part of the city. Kevin got in touch before I arrived, and his brother was there to meet me and show me where everything was, which was great. Last but not least, he had provided a great information on the local area with recommendations for places to eat, etc., which I found really useful.\r\n"
            },
            {
                "at": "2016-04-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdb9",
                    "fullname": "Hector",
                    "imgUrl": "https://robohash.org/36832696?set=set1",
                    "id": "36832696"
                },
                "txt": "Kevin was nice. And he was very responsive via text, which I appreciate. The listing is in East Harlem, which isn't for everyone. The area is not very posh, but, for me, it feels like home, so I tend to stay there whenever I go to New York. The listing description was accurate enough, with respect to the way the apartment looks. If you can't deal with noise at night, however, this might not be the place for you. The neighbors were surprisingly noisy in the wee hours of the night and virtually silent during the day. This apartment is close to the subway, which was very useful."
            },
            {
                "at": "2016-04-23T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdca",
                    "fullname": "Jaime",
                    "imgUrl": "https://robohash.org/37244180?set=set1",
                    "id": "37244180"
                },
                "txt": "Kevin was very helpful and communicative during the whole time. The apartment is very nice, and within walking distance to the subway. Would definitely stay there again."
            },
            {
                "at": "2016-04-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3402e36c59e6164fae69",
                    "fullname": "Anan",
                    "imgUrl": "https://robohash.org/30380132?set=set1",
                    "id": "30380132"
                },
                "txt": "I had a wonderful stay at Kevin's apartment. The apartment is very close to the six train line. Everything in the apartment was spotless clean. I definitely recommend this apartment to others. Thank you Kevin for hosting me!"
            },
            {
                "at": "2016-05-04T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbf23",
                    "fullname": "Yamilis",
                    "imgUrl": "https://robohash.org/5684819?set=set1",
                    "id": "5684819"
                },
                "txt": "Kevin fue excelente anfitrión. Se mantuvo en contacto con nosotros y fue muy comprensivo aún cuando llegamos más tarde de la hora acordada para el check in porque nos perdimos en el subway. También fue muy comprensivo para acordar el check out de acuerdo a la hora que fue más conveniente para nosotros, aún cuando también se nos hizo tarde. Nos proveyó de un matress de aire para nuestra amiga que vino de M.A. y se quedó una noche con nosotros. El barrio nos pareció bien, no tuvimos ningún incidente. Muchos puertoriqueños y Dominicanos, así que nos sentimos como en casa. Todo fue muy cómodo y limpio. Los vecinos hicieron mucho ruido en las noches, pero no fue problema para nosotros. Una sugerencia sería poner un espejo de cuerpo completo en alguna parte del apartento. En resumen, el apartamento fue perfecto para nosotros, nos volveríamos a quedar y claro que lo recomendaría! Muchas Gracias Kevin por tu ayuda!"
            },
            {
                "at": "2016-05-08T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb6a4",
                    "fullname": "Leonam",
                    "imgUrl": "https://robohash.org/44604680?set=set1",
                    "id": "44604680"
                },
                "txt": "Kevin was really thoughtful about everything. He gave me all information needed while staying on his house. The house was very clean."
            },
            {
                "at": "2016-05-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fc063",
                    "fullname": "Amy",
                    "imgUrl": "https://robohash.org/4923470?set=set1",
                    "id": "4923470"
                },
                "txt": "Kevin is a really nice host, flexible and very responsive. The apartment is a 4th-floor walk up, well-maintained and exactly as advertised in the listing. The apartment has all the basic things--it's especially nice to have a kitchen and comfy sofa. There's no TV and wifi, but you probably don't need it anyway since you are here to see New York city! It is just a short 5-min walk from the subway station, so very convenient. Street noise is not a problem although you can hear the neighbors at times (the kids next door can be noisy). East Harlem is a bustling Latino neighborhood with many local eateries and shops. The food selection is supposed to be great (too bad we didn't get to try any). There is a grocery store right outside the building. There're always locals hanging out in front but we were never bothered. All and all, a good choice if you are looking to stay in this part of the city."
            },
            {
                "at": "2016-05-17T04:00:00.000Z",
                "by": {
                    "_id": "622f3401e36c59e6164fab7d",
                    "fullname": "Vlad",
                    "imgUrl": "https://robohash.org/61270769?set=set1",
                    "id": "61270769"
                },
                "txt": "Kevin was an excellent host. Everything was absolutely as described. The apartment is lovely and very clean. There are numerous windows in every room and there is plenty of light! Would definitely stay again!"
            },
            {
                "at": "2016-05-19T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbe7b",
                    "fullname": "Derick",
                    "imgUrl": "https://robohash.org/63351088?set=set1",
                    "id": "63351088"
                },
                "txt": "Great experience, we enjoyed ourselves for the night we stayed, only issue really were the neighbors being loud all night made it hard to sleep."
            },
            {
                "at": "2016-05-21T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbefb",
                    "fullname": "Derek",
                    "imgUrl": "https://robohash.org/794527?set=set1",
                    "id": "794527"
                },
                "txt": "Kevin's place is exactly as other reviewers describe it:  nice and clean, spacious and very convenient as a base to explore and enjoy NYC. \r\n\r\nThe Neighborhood is definitely classic East Harlem.  Very real NYC vibe. Not a tourist area.  \r\n\r\nThe neighbors are noisy sometimes, so if you are a light sleeper, that could be a problem. But I didn't have any trouble. \r\n\r\nIt would have been nice to have wireless, but I didn't come to NYC to play online, so I didn't mind that too much.  \r\n\r\nKevin was a very nice, responsive host! "
            },
            {
                "at": "2016-05-22T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb484",
                    "fullname": "Shiann",
                    "imgUrl": "https://robohash.org/26290842?set=set1",
                    "id": "26290842"
                },
                "txt": "Kevin made my friend and I feel really welcomed. The apartment was very clean!"
            },
            {
                "at": "2016-05-26T04:00:00.000Z",
                "by": {
                    "_id": "622f3403e36c59e6164fb208",
                    "fullname": "Stephanie",
                    "imgUrl": "https://robohash.org/73751485?set=set1",
                    "id": "73751485"
                },
                "txt": "Me and my husband stayed in the apartment this was our first time using this site and Kevin made us feel like we are regulars. We stayed one night and it was wonderful. Kevin contacted us right away and was really good with getting us whatever we need to stay there. The area is the only bad thing but when we went in the apartment you really forget about the outside."
            },
            {
                "at": "2016-05-29T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb52c",
                    "fullname": "Virginie",
                    "imgUrl": "https://robohash.org/8842288?set=set1",
                    "id": "8842288"
                },
                "txt": "Kevin is easy to get in touch with and waited for us to arrive Even if it was already late in the evening. He even asked if everything was fine during our stay.\nThe appartment is perfectly situated to visit Manhattan island. Just note the neighbours are noisy if it is important to you."
            },
            {
                "at": "2016-06-06T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb803",
                    "fullname": "Ada",
                    "imgUrl": "https://robohash.org/65358522?set=set1",
                    "id": "65358522"
                },
                "txt": "Kevin was absolutely wonderful. He was very responsive and communicative and I could tell he takes great pride in being an exceptional host. His place was exactly as described, as shown in the pictures and also very clean. The neighborhood is great and the room is a great price for someone looking to stay in the city and explore. It's right next to the trains, neighborhood gems but also commonly known stores for anyone who isn't familiar with the area. "
            },
            {
                "at": "2016-06-11T04:00:00.000Z",
                "by": {
                    "_id": "622f3406e36c59e6164fbc21",
                    "fullname": "Fernando",
                    "imgUrl": "https://robohash.org/75294316?set=set1",
                    "id": "75294316"
                },
                "txt": "everything was correct , very good condition to this price"
            },
            {
                "at": "2016-06-14T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbdfe",
                    "fullname": "Francesca",
                    "imgUrl": "https://robohash.org/56355386?set=set1",
                    "id": "56355386"
                },
                "txt": "This is my first time using Airbnb. Kevin responded quickly to my inquiry about booking his apartment. Once booked he was very easy to reach via phone or text if I needed to. His one bedroom apartment was very clean and nicely furnished. It is central to a lot of restaurants and neighborhood shopping should you need something and a couple blocks from the subway and buses. Kevin was a great host. He was there to greet me, show me around the apartment and tell me a bit about the area. He also has maps and booklets about what to visit while in New York City. There is wifi in the apartment which is great. Kevin checked in with me just to make sure everything was ok during my trip. I had a wonderful stay at his apartment and would book it again! "
            },
            {
                "at": "2016-06-20T04:00:00.000Z",
                "by": {
                    "_id": "622f3404e36c59e6164fb4de",
                    "fullname": "Alex",
                    "imgUrl": "https://robohash.org/45975680?set=set1",
                    "id": "45975680"
                },
                "txt": "Kevin was a phenomenal host, he was very accommodating about arrival and check out times and provided me with a ton of useful information to navigate the area and make my stay as pleasant as possible. The apartment is two blocks from the subway and easy to navigate from. I would definitely recommend staying at Kevin's for all those considering a trip to New York."
            },
            {
                "at": "2016-06-24T04:00:00.000Z",
                "by": {
                    "_id": "622f3407e36c59e6164fbd08",
                    "fullname": "Johanna",
                    "imgUrl": "https://robohash.org/75777207?set=set1",
                    "id": "75777207"
                },
                "txt": "The apartment is as described. Kevin is very pleasant and was kind to helped me bring my belongings to the apartment. The apartment is cozy in a great location. I will definitely be using this apartment again"
            },
            {
                "at": "2016-07-03T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb7a6",
                    "fullname": "Bandele",
                    "imgUrl": "https://robohash.org/5357325?set=set1",
                    "id": "5357325"
                },
                "txt": "Kevin's a great guy, but if you're looking for a hotel-like experience, this is NOT it... This however, IS a genuine NYC experience. Noisy & inconsiderate neighbors, dirty streets, dangerous vibes... All in all your safe, and anyone you actually talk to will be cool... Kevin was also very considerate and did everything he could to add comfort to my stay, he even warned me of the noisy neighbors in advance... This place is good for people who already know NYC, and need an affordable, SHORT-TERM (like 1-2days), place to crash uptown..."
            },
            {
                "at": "2016-07-13T04:00:00.000Z",
                "by": {
                    "_id": "622f3405e36c59e6164fb80a",
                    "fullname": "Bryan",
                    "imgUrl": "https://robohash.org/73430217?set=set1",
                    "id": "73430217"
                },
                "txt": "This place was cozy, comfortable and very clean. The AC was very helpful during the heat waves. Good shower and great WiFi connection as well."
            }
        ],
        "likedByUsers": []
    }
]



let gStays

_createDemoStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { name: '', price: 0 }) {
    var stays = await storageService.query(STAY_STORAGE_KEY)
    if (filterBy.name) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STAY_STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STAY_STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STAY_STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STAY_STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STAY_STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        name: '',
        description: '',
        price: '',
        type: '',
        imgUrls: [],
        summary: '',
        capacity: '',
    }
}




// *********************** PRIVATE FUNCTIONS ***********************

function _createDemoStays() {
    gStays = utilService.loadFromStorage(STAY_STORAGE_KEY) || []
    if (gStays.length > 0) return gStays


    // To toggle between BIG DEMO DATA/OUR HANDMADE DEMO DATA:
    // Change This Manually to TRUE/FALSE and clear local storage!!
    // ***********************************************
    // ***********************************************
    const BIG_DEMO_DATA = true
    // ***********************************************
    // ***********************************************


    if (BIG_DEMO_DATA) {
        gStays = STAYS_TRUE_DEMO_TEMP
    } else {

        gStays.push(_createDemoStay(
            'Casa Indy village paradise',
            'Entire guesthouse hosted by Mia',
            'House',
            { country: "Cyprus", countryCode: "CY", city: "Limassol", lat: 35.1264, lan: 33.4299 },
            [
                'https://a0.muscache.com/im/pictures/619197e3-3427-4ee2-83d1-c04fcd80720d.jpg',
                'https://a0.muscache.com/im/pictures/770dfa27-f8f8-43cd-a40a-f3d308ff2255.jpg',
                'https://a0.muscache.com/im/pictures/23744814-ec6c-43e2-84a8-b038f73efe44.jpg',
                'https://a0.muscache.com/im/pictures/33a44003-0782-491b-9155-96461fd04fba.jpg',
                'https://a0.muscache.com/im/pictures/6c937234-a28f-4ee2-9310-7567b450fbf2.jpg',
                'https://a0.muscache.com/im/pictures/757a5d77-6f26-4c56-a621-585613adb288.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Once in a lifetime experience - bedroom room view beside seaside cliff',
            'A single bedroom cabin with an enormous glass window facing the ocean from a cliff',
            'Cabin',
            { country: "Portugal", countryCode: "PT", city: "Lisbon", lat: 38.7223, lan: -9.142685 },
            [
                'https://a0.muscache.com/im/pictures/0f7a9ab8-6b60-45cb-8e00-02b7fbbe19f0.jpg',
                'https://a0.muscache.com/im/pictures/b567fde4-e9fd-401c-82ae-90e375adcc0c.jpg',
                'https://a0.muscache.com/im/pictures/125b284a-7775-497f-86f4-f0c2de7dfbb3.jpg',
                'https://a0.muscache.com/im/pictures/143bbdc0-a455-49cc-b502-30984666c0a7.jpg',
                'https://a0.muscache.com/im/pictures/434a3847-56d5-4454-b956-189a3c610088.jpg',
                'https://a0.muscache.com/im/pictures/890d442c-bf11-44f8-8636-73c35f709e33.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Enormous Duplex apartment in a lively downtown block',
            'Fantastic duplex apartment with an elevator and a balcony adorned with potted greenery....',
            'House',
            { country: "Israel", countryCode: "IL", city: "Haifa", lat: 32.7940, lan: 34.9896 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'High-rise building apartment - fantastic view of the beautiful city',
            'An apartment in a high-rise building',
            'Apartment',
            { country: "Israel", countryCode: "IL", city: "Eilat", lat: 29.5581, lan: 34.9482 },
            [
                'https://a0.muscache.com/im/pictures/0f7a9ab8-6b60-45cb-8e00-02b7fbbe19f0.jpg',
                'https://a0.muscache.com/im/pictures/b567fde4-e9fd-401c-82ae-90e375adcc0c.jpg',
                'https://a0.muscache.com/im/pictures/125b284a-7775-497f-86f4-f0c2de7dfbb3.jpg',
                'https://a0.muscache.com/im/pictures/143bbdc0-a455-49cc-b502-30984666c0a7.jpg',
                'https://a0.muscache.com/im/pictures/434a3847-56d5-4454-b956-189a3c610088.jpg',
                'https://a0.muscache.com/im/pictures/890d442c-bf11-44f8-8636-73c35f709e33.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))
        gStays.push(_createDemoStay(
            'Comfy single bed room for single night\'s nap',
            '1 small neat and compact room with a bed and a small window facing the tram train passing by',
            'Room',
            { country: "Israel", countryCode: "IL", city: "Tel Aviv", lat: 32.0853, lan: 34.7818 },
            [
                'https://a0.muscache.com/im/pictures/cd0f10cf-7f98-4a90-adc5-ac0726d559b1.jpg',
                'https://a0.muscache.com/im/pictures/4db8afca-8543-4be4-9c18-64803f262bf9.jpg',
                'https://a0.muscache.com/im/pictures/20527ca6-272a-473d-824f-062cae7d1086.jpg',
                'https://a0.muscache.com/im/pictures/2d475438-7ce9-4ce3-86b7-9c15c60f3181.jpg',
                'https://a0.muscache.com/im/pictures/27437609-40df-4d63-9127-d407fc4d9a17.jpg',
                'https://a0.muscache.com/im/pictures/dedd981e-5102-47fb-81fa-b62483c49ad4.jpg',
            ]
        ))

    }
    utilService.saveToStorage(STAY_STORAGE_KEY, gStays)
}

// function calculateRate(stay) {
//     const reviewInputs = stay.reviews.map(review => review.reviewInputs)
//     const reviewCount = reviewInputs.length
//     const reviewInputsTotal = reviewInputs.reduce((acc, inputs) => {
//         for (const key in inputs) {
//             acc[key] = (acc[key] || 0) + inputs[key]
//         }
//         return acc
//     }, {})
//     const reviewInputsAverage = {};
//     for (const key in reviewInputsTotal) {
//         reviewInputsAverage[key] = reviewInputsTotal[key] / reviewCount
//     }
//     const rate = Object.values(reviewInputsAverage).reduce(
//         (sum, value) => sum + value,
//         0
//     ) / Object.keys(reviewInputsAverage).length;

// }


function _createDemoStay(name, summary, type, loc, imgUrls) {
    const reviews = [
        {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, incidunt corrupti illo animi hic voluptatum corporis ullam natus! Qui, expedita animi magnam harum iusto mollitia itaque voluptas unde obcaecati aut.",
            reviewInputs: {
                cleanliness: 4.8,
                communication: 5,
                'check-in': 5,
                accuracy: 4.8,
                location: 4.8,
                value: 4.4
            },
            by: {
                _id: "u102",
                fullname: "Jack",
                date: "May 2023",
                imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/60.jpg"
            }
        },
        {
            id: "madeId",
            txt: "Love this place, was soo peaceful and we had a marvelous time. Perfect little kitchen and beautiful views to enjoy. We loved all the activities they offer and driving around the local area, we can`t wait to go back.",
            reviewInputs: {
                cleanliness: 4.2,
                communication: 1,
                'check-in': 5,
                accuracy: 4.5,
                location: 4.8,
                value: 4.4
            },
            by: {
                _id: "u103",
                fullname: "Patricia",
                date: "September 2022",
                imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/14.jpg"
            }
        },
        {
            id: "madeId",
            txt: "We had the best honeymoon we could have asked for here!",
            reviewInputs: {
                cleanliness: 4.8,
                communication: 4,
                'check-in': 1,
                accuracy: 4.8,
                location: 3.8,
                value: 4.4
            },
            by: {
                _id: "u104",
                fullname: "Lina & Alexis",
                date: "January 2023",
                imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/63.jpg"
            }
        },
        {
            id: "madeId",
            txt: "It was a dream of a stay. The hosts go above and beyond. Such kind, earnest interactions and the best tips/advice. The property itself is ideal for an adventure that is also peaceful and calming. I’d recommend to anyone whose looking to leave their trip refreshed and with new perspective. Everything was thoughtfully prepared and the communication was excellent and accurate.",
            reviewInputs: {
                cleanliness: 4.8,
                communication: 5,
                'check-in': 5,
                accuracy: 4.8,
                location: 4.8,
                value: 4.4
            },
            by: {
                _id: "u105",
                fullname: "Juan Carlo",
                date: "May 2023",
                imgUrl: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/51.jpg"
            }
        }
    ]
    const overallRate = _calculateOverallRate(reviews)

    const updatedReviews = reviews.map(review => ({ ...review, rate: overallRate }))

    // redundant: description? ,availableDates?
    // missing: bathrooms, bedrooms, roomType, host:{...missing keys here}, loc:{missing "address" key here}, likedByUsers
    return {
        _id: utilService.makeId(),
        name,
        summary,
        description: '<Enter Description Here>',
        type,
        price: utilService.getRandomIntInclusive(100, 9000),
        capacity: utilService.getRandomIntInclusive(1, 10),
        imgUrls,
        reviews: updatedReviews,
        loc: {
            country: loc.country,
            countryCode: loc.countryCode,
            city: loc.city,
            // coordinates: {
            lat: loc.lat,
            lan: loc.lan
            // }
        },
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Refrigerator",
            "Pets allowed",
            "Cooking basics",
            "Hot tub",
            "Air conditioning",
            "Gym"
        ],
        labels: [
            "Lakefront",
            "Tiny Homes",
            "Cabins",
            "Mansions"
        ],
        //below is temp!
        checkIn: 1685116800000,
        checkOut: 1685116800000 + 86400000 * 3,//in 3 days
        host: {
            _id: utilService.makeId(),
            fullname: 'Pablo Escobar',
            image: "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/60.jpg"
        },
        availableDates: [
            {
                from: utilService.getFutureTime(),
                to: utilService.getFutureTime(3, 'day'),
            },
            {
                from: utilService.getFutureTime(6, 'day'),
                to: utilService.getFutureTime(9, 'day'),
            }
        ],
    }
}

function _calculateOverallRate(reviews) {
    const totalReviews = reviews.length
    const ratingSum = reviews.reduce((sum, review) => {
        const ratingValues = Object.values(review.reviewInputs)
        const sumForReview = ratingValues.reduce((acc, curr) => acc + curr, 0)
        return sum + sumForReview
    }, 0)
    const overallRate = totalReviews > 0 ? ratingSum / (totalReviews * 6) : 0
    return Number(overallRate.toFixed(1))
}
