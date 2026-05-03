'use client';

import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, MapPin, Navigation, Map as MapIcon, Loader2 } from 'lucide-react';
import { Booth } from '@/types';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BoothCard } from '@/components/booth/BoothCard';
import { isValidEPIC } from '@/lib/utils';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 26.8467,
  lng: 80.9462 // Lucknow center
};

// Mock booth data
const mockBooths: Booth[] = [
  {
    id: "B1",
    name: "Primary School, Hazratganj",
    number: 101,
    address: "MG Marg, Hazratganj, Lucknow, UP 226001",
    constituency: "Lucknow Central",
    district: "Lucknow",
    state: "Uttar Pradesh",
    latitude: 26.8500,
    longitude: 80.9400,
    bloName: "Ramesh Kumar",
    bloPhone: "9876543210",
    accessibility: {
      ramp: true,
      wheelchair: true,
      drinkingWater: true,
      shade: true,
      toilets: true
    }
  },
  {
    id: "B2",
    name: "Govt Inter College",
    number: 102,
    address: "Gomti Nagar, Lucknow, UP 226010",
    constituency: "Lucknow East",
    district: "Lucknow",
    state: "Uttar Pradesh",
    latitude: 26.8600,
    longitude: 80.9800,
    bloName: "Sunita Singh",
    bloPhone: "9876543211",
    accessibility: {
      ramp: true,
      wheelchair: false,
      drinkingWater: true,
      shade: false,
      toilets: true
    }
  }
];

export default function BoothFinderPage() {
  const { t, language } = useLanguage();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"]
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [searchEpic, setSearchEpic] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Booth[]>(mockBooths);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    mockBooths.forEach(booth => {
      if (booth.latitude && booth.longitude) {
        bounds.extend({ lat: booth.latitude, lng: booth.longitude });
      }
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEpic.trim() || !isValidEPIC(searchEpic)) {
      alert(language === 'en' ? 'Please enter a valid EPIC number (e.g. ABC1234567)' : 'कृपया एक मान्य ईपीआईसी नंबर दर्ज करें (जैसे ABC1234567)');
      return;
    }
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockBooths);
      if (map && mockBooths.length > 0 && mockBooths[0].latitude && mockBooths[0].longitude) {
        map.panTo({ lat: mockBooths[0].latitude, lng: mockBooths[0].longitude });
        map.setZoom(15);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getUserLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.panTo(pos);
          map.setZoom(14);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    }
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <MapIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t('booth.mapFailed')}</h2>
        <p className="text-[var(--text-muted)] max-w-md">
          {t('booth.mapFailedDesc')}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
          {t('booth.title')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          {t('booth.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)] min-h-[600px]">
        {/* Search Panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="glass-card p-4 rounded-2xl flex-shrink-0">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">{t('booth.searchOptions')}</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  {t('booth.epicNumber')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchEpic}
                    onChange={(e) => setSearchEpic(e.target.value.toUpperCase())}
                    placeholder={t('booth.searchPlaceholder')}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:border-saffron-500 transition-colors"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSearching || !searchEpic}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : t('booth.searchButton')}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-color)]"></div>
              </div>
              <span className="relative bg-[var(--bg-card)] px-3 text-xs text-[var(--text-muted)] uppercase font-semibold tracking-wider">
                {t('booth.or')}
              </span>
            </div>

            <button
              onClick={getUserLocation}
              className="w-full py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5 text-blue-500" />
              {t('booth.useMyLocation')}
            </button>
          </div>

          {/* Results List */}
          <div className="glass-card rounded-2xl flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[var(--border-color)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {t('booth.results')} ({searchResults.length})
              </h2>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
              {searchResults.map(booth => (
                <BoothCard 
                  key={booth.id}
                  booth={booth}
                  isSelected={selectedBooth?.id === booth.id}
                  onClick={() => {
                    setSelectedBooth(booth);
                    if (map && booth.latitude && booth.longitude) {
                      map.panTo({ lat: booth.latitude, lng: booth.longitude });
                      map.setZoom(16);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden relative">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]">
              <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: [], 
                disableDefaultUI: false,
                mapTypeControl: false,
                streetViewControl: true,
              }}
            >
              {searchResults.map(booth => (
                booth.latitude && booth.longitude ? (
                  <Marker
                    key={booth.id}
                    position={{ lat: booth.latitude, lng: booth.longitude }}
                    onClick={() => setSelectedBooth(booth)}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FF6B35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>'),
                      scaledSize: new window.google.maps.Size(32, 32),
                      anchor: new window.google.maps.Point(16, 32),
                    }}
                  />
                ) : null
              ))}

              {selectedBooth && selectedBooth.latitude && selectedBooth.longitude && (
                <InfoWindow
                  position={{ lat: selectedBooth.latitude, lng: selectedBooth.longitude }}
                  onCloseClick={() => setSelectedBooth(null)}
                >
                  <div className="p-1 max-w-[250px] text-gray-800">
                    <h3 className="font-bold text-base mb-1">{selectedBooth.name}</h3>
                    <p className="text-xs mb-2">{selectedBooth.address}</p>
                    <div className="text-xs bg-gray-100 p-2 rounded mb-2">
                      <p><strong>{t('booth.constituency')}:</strong> {selectedBooth.constituency}</p>
                      <p><strong>{t('booth.boothNo')}:</strong> {selectedBooth.number}</p>
                      {selectedBooth.bloName && (
                        <p className="mt-1 border-t pt-1">
                          <strong>{t('booth.blo')}:</strong> {selectedBooth.bloName}<br/>
                          {selectedBooth.bloPhone}
                        </p>
                      )}
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.latitude},${selectedBooth.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded hover:bg-blue-700 transition-colors"
                    >
                      <Navigation className="w-3 h-3" /> {t('booth.getDirections')}
                    </a>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}
