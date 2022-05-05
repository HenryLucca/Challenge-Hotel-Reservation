function getCheapestHotel (input) { //DO NOT change the function's name.
    
    // Formating the input
    const inputSplit = input.split(':');
    const clientType = inputSplit[0];
    const dates = inputSplit[1].split(', ');

    // Hotel props
   const hotels = {
        'Lakewood': {
                'name': 'Lakewood',
                'rating': 3,
                'weekDayPriceRegular': 110,
                'weekDayPriceRewards': 80,
                'weekendPriceRegular': 90,
                'weekendPriceRewards': 80
            },
        'Bridgewood': {
                'name': 'Bridgewood',
                'rating' : 4,
                'weekDayPriceRegular': 160,
                'weekDayPriceRewards': 110,
                'weekendPriceRegular': 60,
                'weekendPriceRewards': 50
        },
        'Ridgewood': {
                'name': 'Ridgewood',
                'rating' : 5,
                'weekDayPriceRegular': 220,
                'weekDayPriceRewards': 110,
                'weekendPriceRegular': 150,
                'weekendPriceRewards': 40
            }
    }

    // weekDays the client is staying at the hotel
    let weekDays = [];
    for ( let date in dates) {
        weekDays.push(getWeekDays(dates[date]));
    }
    
    // return the cheapest hotel
    const cheapestHotelName = cheapestHotel(hotels, clientType, weekDays);

    return cheapestHotelName;
}

function getWeekDays(date) {
    const dateSplit = date.split('(');
    const weekDay = dateSplit[1].split(')')[0];
    return weekDay;
}

function cheapestHotel(hotels, clientType, weekDays) {

    let cheapestHotelPrice = Number.MAX_VALUE;
    let cheapestHotelName = '';

    // For each hotel, calculate the price
    // and compare it with the cheapestHotelPrice
    // if it is cheaper, set the new cheapestHotel
    for(let hotel in hotels) {

        const hotelPrice = calculateHotelPrice(hotels[hotel], clientType, weekDays);

        if(hotelPrice < cheapestHotelPrice) {
            cheapestHotelPrice = hotelPrice;
            cheapestHotelName = hotels[hotel].name;
        } else if(hotelPrice === cheapestHotelPrice) {
            cheapestHotelPrice = hotelPrice;
            cheapestHotelName = hotel;
        }


    }
    return cheapestHotelName;
}

function calculateHotelPrice(hotel, clientType, weekDays) {

    let businessDays = 0;
    let weekendDays = 0;
    let totalPrice = 0;

    for(let day in weekDays) {
        // for each businessDay in weekDays
        if (weekDays[day] === 'mon' || weekDays[day] === 'tues' || weekDays[day] === 'wed' || weekDays[day] === 'thurs' || weekDays[day] === 'fri') {
            businessDays++;
        }
        else {
            weekendDays++;
        }
    }

    // summing up the price for each day, depending on the client type
    if(clientType === 'Regular') {

        totalPrice = businessDays * hotel.weekDayPriceRegular + weekendDays * hotel.weekendPriceRegular;

    } else if (clientType === 'Rewards') {
        totalPrice = businessDays * hotel.weekDayPriceRewards + weekendDays * hotel.weekendPriceRewards;
    }

    // hotel price
    return totalPrice;
}

exports.getCheapestHotel = getCheapestHotel
