# Air Quality Dashboard — Architecture

## Overview

This app aggregates air quality and weather data from satellite (TEMPO), ground stations (OpenAQ), OpenWeatherMap, and user devices. It merges, deduplicates, and forecasts AQI, providing AI-powered, role-specific recommendations for users. The backend orchestrates data ingestion, processing, storage, AI, and notification logic. The frontend visualizes and personalizes the experience.

---

## Data Flow

1. **User Auths & Onboards:**
   - Selects role, provides location and (optional) health info.
   - JWT cookie/session is established.

2. **Data Aggregation (cron + on-demand):**
   - Every 10–15min, backend jobs fetch:
     - **TEMPO**: Satellite tiles for user locations
     - **OpenAQ**: Nearest ground stations
     - **OpenWeatherMap**: Current + forecast
   - Device webhooks or MQTT bridge push telemetry.
   - Data is normalized as `AirObservation` (source, lat/lng, timestamp, aqi, pm25, no2, ozone, payload).
   - Deduplication rules: prefer device > OpenAQ > TEMPO for near-ground values.

3. **User Dashboard Load:**
   - Frontend requests `/api/data/nearby?lat=&lng=&radiusKm=`
   - Backend merges latest air+weather+forecast, computes AQI and time series.

4. **AI Recommendation:**
   - User/teacher requests "Advice" or forecast rec.
   - Backend POSTs to OpenAI with role, healthInfo, current, and forecast.
   - Returns: action, reason, thresholds, notification, confidence.

5. **Notifications:**
   - If AQI crosses thresholds, in-app and (optionally) email/push notifications are sent.

---

## API Contracts

- **See README.md for endpoint list.**

- **Security:**
  - Auth via JWT in HttpOnly cookie.
  - Devices: HMAC signature or MQTT auth.
  - Rate limiting on telemetry endpoints.
  - All user input and external data validated/sanitized.

---

## Data Model

See `/backend/prisma/schema.prisma` for full details.

## UI

- MUI v5, glass cards, neon blue/purple, high contrast
- Map: Leaflet + OSM, vector heatmap for AQI, device and station markers, weather overlays
- Role-based recommendations visible in dedicated panel

## Demo Mode

If real APIs are unavailable, backend returns synthetic telemetry and AI responses. Toggle with env var or fallback logic.

---

## Extensibility

- Add new sensors or health metrics by extending Prisma schema and data adapters
- Add notification channels via new backend service
- Support additional roles or AI prompt templates via config

---

## Open Questions

- Vector tile vs raster tile for AQI overlays?
- Push notification channel for mobile (web push or email only)?
- Public API for 3rd-party device registration?

---

## Contact

See GitHub issues for roadmap & discussion.