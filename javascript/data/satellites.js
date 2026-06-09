/**
 * Banco de dados simulado (Mock) contendo a lista de satélites disponíveis no Marketplace.
 * Cada objeto contém os dados comerciais e também os parâmetros orbitais (altitude, inclinação, RAAN)
 * que são usados pelo motor 3D (Three.js) para desenhar a órbita de forma fisicamente coerente no globo.
 */
window.satellites = [

  {

    id: "dove-psb",

    name: "OrbitRent Dove-PSB",

    provider: "Planet Labs",

    category: "Imagery",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.8,

    reviews: 127,

    resolution: "3.0 m",

    revisit: "Daily",

    format: "GeoTIFF",

    price: "R$ 15.00",

    priceUnit: "/ km²",

    altitudeInKilometers: 550,

    inclinationInDegrees: 53,

    raanInDegrees: 45,

    satelliteColorCode: "#3B7BF5"

  },

  {

    id: "worldview-3",

    name: "OrbitRent WorldView-3",

    provider: "Maxar Technologies",

    category: "Imagery",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.9,

    reviews: 84,

    resolution: "30 cm",

    revisit: "1-4 Days",

    format: "GeoTIFF",

    price: "R$ 45.00",

    priceUnit: "/ km²",

    altitudeInKilometers: 617,

    inclinationInDegrees: 97.9,

    raanInDegrees: 180,

    satelliteColorCode: "#FF6B35"

  },

  {

    id: "sentinel-2",

    name: "OrbitRent Sentinel-2",

    provider: "Copernicus",

    category: "Imagery",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.6,

    reviews: 215,

    resolution: "10 m",

    revisit: "5 Days",

    format: "SAFE",

    price: "R$ 0.00",

    priceUnit: "/ Free",

    altitudeInKilometers: 786,

    inclinationInDegrees: 98.5,

    raanInDegrees: 0,

    satelliteColorCode: "#18D4A7"

  },

  {

    id: "spire-lemur",

    name: "OrbitRent Spire LEMUR",

    provider: "Spire Global",

    category: "Telemetry",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.7,

    reviews: 56,

    resolution: "AIS/ADS-B",

    revisit: "Hourly",

    format: "JSON API",

    price: "R$ 180.00",

    priceUnit: "/ day",

    altitudeInKilometers: 500,

    inclinationInDegrees: 83,

    raanInDegrees: 90,

    satelliteColorCode: "#D62839"

  },

  {

    id: "bee-iot",

    name: "OrbitRent BEE-IoT",

    provider: "Swarm Technologies",

    category: "Connectivity",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.5,

    reviews: 312,

    resolution: "200 bytes",

    revisit: "15-60 min",

    format: "JSON",

    price: "R$ 0.05",

    priceUnit: "/ message",

    altitudeInKilometers: 400,

    inclinationInDegrees: 51.6,

    raanInDegrees: 210,

    satelliteColorCode: "#1D66F5"

  },

  {

    id: "link-cell",

    name: "OrbitRent Link-Cell",

    provider: "SpaceX Starlink",

    category: "Connectivity",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.9,

    reviews: 89,

    resolution: "LTE-M",

    revisit: "Real-time",

    format: "TCP/UDP",

    price: "R$ 2.50",

    priceUnit: "/ MB",

    altitudeInKilometers: 550,

    inclinationInDegrees: 53.2,

    raanInDegrees: 270,

    satelliteColorCode: "#00A8E8"

  },

  {

    id: "terrasync-sar",

    name: "OrbitRent TerraSync-SAR",

    provider: "ICEYE",

    category: "Imagery",

    image: "assets/satellites/satellite-card-thumbnail.png",

    rating: 4.7,

    reviews: 142,

    resolution: "1 m SAR",

    revisit: "< 20h",

    format: "GeoTIFF",

    price: "R$ 280.00",

    priceUnit: "/ capture",

    altitudeInKilometers: 560,

    inclinationInDegrees: 97.7,

    raanInDegrees: 135,

    satelliteColorCode: "#F08A5D"

  }

];