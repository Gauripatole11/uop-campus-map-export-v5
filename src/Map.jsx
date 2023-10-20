import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  AppBar,
  Toolbar, // Add the Toolbar component
  Typography, // Add the Typography component
} from "@material-ui/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const zoom = 13;
const regionCoord = [37.9799, -121.3129];
const additionalMarkerCoord = [37.9817, -121.312];

// Create custom icons for different categories
const icons = {
  Makerspace: L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  }),
  "Study Rooms": L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasuLYAAZtVpiKHNNfS3-hK0u8cmQMsf63TSvclqd-8bi_D2qyj5yMN24Y6N0GPkMB-l0&usqp=CAU"
  }),
  LABS: L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
        "https://cdn4.iconfinder.com/data/icons/hotel-and-reservation-services-glyph/64/hotel_location-512.png"
  })
};

const markers = [
  {
    position: [37.979780, -121.308990],
    category: "Makerspace",
    name: "Makerspace",
    hours: "9 AM - 5 PM",
    phone: "123-456-7890",
    image:
        "https://www.pacific.edu/sites/default/files/styles/carousel_image_mobile_img_style/public/2020-09/Senior%20Project%201.jpg?itok=44I6TyI2"
  },
  {
    position: additionalMarkerCoord,
    category: "Study Rooms",
    name: "DeRosa University Center",
    hours: "7 AM - 11 PM",
    phone: "987-654-3210",
    image: "https://ffpubliclibrary.prod.govaccess.org/home/showimage?id=1742" // Add the URL of the first image here
  },
  {
    position: [37.9789, -121.3111],
    category: "Study Rooms",
    name: "Student Support Center",
    hours: "7 AM - 12AM",
    phone: "555-555-5555",
    image:
        "https://www.officeevolution.com/wp-content/uploads/2022/05/AZ-Phoenix-2-1.jpg"
  },
  {
    position: [37.979751, -121.309154],
    category: "Study Rooms",
    name: "The Cube",
    hours: "7 AM - 8 PM",
    phone: "444-444-4444",
    image: "https://ffpubliclibrary.prod.govaccess.org/home/showimage?id=1742" // Add the URL of the third image here
  },
  {
    position: [37.979680, -121.311092],
    category: "Study Rooms",
    name: "Khoury Hall",
    hours: "7 AM - 8 PM",
    phone: "444-444-4444",
    image: "https://www.pacific.edu/sites/default/files/styles/two_column_header_image/public/2020-07/RS37373_Summer%20Campus%20Beauty1-lpr.jpg?itok=fS3JIzE5" // Add the URL of the third image here
  },
  {
    position: [37.975949, -121.311046],
    category: "Study Rooms",
    name: "Classroom Building",
    hours: "10AM - 8 PM",
    phone: "444-444-4444",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqVJZBFDoUkJCNK1nnbt0tX_kmfzWjbHL0sw&usqp=CAU" // Add the URL of the third image here
  },
  {
    position: [37.9789, -121.3111],
    category: "LABS",
    name: "John T Chamber Technology Centre",
    hours: "7 AM - 8 PM",
    phone: "123-456-7890",
    image:
        "https://www.pacific.edu/sites/default/files/users/user245/Pacific_Zoom_backgrounds-11.jpg" // Add the URL of the image here
  },
  {
    position: [37.980156, -121.310679],
    category: "LABS",
    name: "Anderson Hall",
    hours: "8 AM - 9 PM",
    phone: "987-654-3210",
    image:
        "https://pacificpredentalclub.weebly.com/uploads/5/1/8/5/5185698/2306319.jpg?323"
  },
  // Add more "Labs" markers with images as needed

  {
    position: [37.980155, -121.311378],
    category: "LABS",
    name: "Hydraulics Lab",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image:
        "https://www.visitstockton.org/imager/files_idss_com/C102/10d3cebd-d368-42b9-ab29-a723bf845512_2d2caff0c681c4a1088a322eee091b5a.jpg"
  },
  {
    position: [37.976279, -121.31183],
    category: "LABS",
    name: "Biology Laboratory",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image:
        "https://dental.pacific.edu/sites/default/files/styles/two_column_header_image_desktop/public/2020-09/1191347691818006.JB5XjSm4heiOoRmWE40M_height640.png?itok=c2wnrxYh"
  },
  {
    position: [39.976279, -121.31190],
    category: "LABS",
    name: "Chemistry Laboratory",
    hours: "8 AM - 5 PM",
    phone: "987-654-3276",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fbq3UOG2WlRTYqGiPQNjk_RWsHsZZrCblQ&usqp=CAU"
  },
  {
    position: [37.981697, -121.308621],
    category: "LABS",
    name: "Chemistry Laboratory",
    hours: "8 AM - 5 PM",
    phone: "987-654-3276",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHLTgcMYFkA7AACCH6rCEh5G3pCwdDNtvDA&usqp=CAU"
  },
  {
    position: [37.976586, -121.314124],
    category: "LABS",
    name: "CyberSecurity Lab",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image: "https://assets.obj.ca/2023/09/Algonquin-cybersecurity-lab.jpg"
  }
];
function Map() {
  const [map, setMap] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // Moved the state declaration here
  const [uopLogoUrl, setUopLogoUrl] = useState("");

  useEffect(() => {
    // Fetch the University of the Pacific logo URL
    fetch("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79srloY6rh0EKkmKdvkIKS2OqlsiQIQQ0ig&usqp=CAU") // Replace with the actual URL
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error("Failed to fetch logo");
          }
        })
        .then((blob) => {
          // Create a URL from the blob
          const objectURL = URL.createObjectURL(blob);
          setUopLogoUrl(objectURL);
        })
        .catch((error) => {
          console.error("Error fetching logo:", error);
        });
  }, []); // Empty dependency array to fetch the logo once on component mount

  function FlyToButton() {
    const onClick = () => {
      map.flyTo(regionCoord, zoom);
    };

    return <Button onClick={onClick}>RE-CENTRE</Button>;
  }


  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      // If category is already selected, remove it
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // If category is not selected, add it
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter markers based on the selected categories
  const filteredMarkers = selectedCategories.length
      ? markers.filter((marker) => selectedCategories.includes(marker.category))
      : markers;

  const sidebarStyles = {
    background: "#f0f0f0",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px"
  };

  const categoryColors = {
    Makerspace: "#C1E3ED",
    "Study Rooms": "#C1E3ED",
    LABS: "#C1E3ED",
  };

  const buttonStyles = {
    marginBottom: "10px",
    width: "100%",
    textAlign: "left",
  };

  return (
      <Grid container>
        <Grid item xs={2}>
          <AppBar position="static" style={{ background: "#0C023E" }}>
            <Toolbar>
              <Typography variant="h6" style={{ fontFamily: "Brush Script MT, Brush Script Std, cursive", fontSize: "1.5rem" }}>
                University of the Pacific
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={sidebarStyles}>
            {uopLogoUrl && (
                <img
                    src={uopLogoUrl}
                    alt="University of the Pacific"
                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                />
            )}
            <h2>Categories</h2>


            <FormControl>
              {Object.keys(icons).map((category) => (
                  <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            name={category}
                        />
                      }
                      label={category}
                      style={{
                        backgroundColor: categoryColors[category] || "gray",
                        marginBottom: "5px",
                      }}
                  />
              ))}
            </FormControl><b>
            <Button style={buttonStyles} onClick={() => setSelectedCategories([])}>
              View All
            </Button></b>
            <FlyToButton />
            {/* Additional Information Section */}
            <div style={{ marginTop: "20px", padding: "5px", background: "#f0f0f0", borderRadius: "5px" }}>
              <h3>Additional Information</h3>
              <ul>
                <b><u>Stockton Campus</u></b>
                <li>3601 Pacific Ave.
                  Stockton, CA 95211
                  Admissions: 209.946.2211</li>
              </ul>

              {/* Add more content as needed */}
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <MapContainer
              center={regionCoord}
              zoom={zoom}
              style={{ height: "80vh" }}
              whenCreated={setMap}
          >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredMarkers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={icons[marker.category]}
                >
                  <Popup>
                    <div>
                      <h3>{marker.name}</h3>
                      <p>Category: {marker.category}</p>
                      <p>Hours: {marker.hours}</p>
                      <p>Phone: {marker.phone}</p>
                      {marker.image && (
                          <img
                              src={marker.image}
                              alt="Marker Image"
                              style={{ maxWidth: "100%" }}
                          />
                      )}
                    </div>
                  </Popup>
                </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
  );
}

export default Map;