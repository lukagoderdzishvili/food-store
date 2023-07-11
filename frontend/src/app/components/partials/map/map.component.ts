import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input()
  order!: Order;
  private readonly MARKER_ZOOM_LEVEL: number = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      './assets/marker.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', {static: true})
  mapRef!: ElementRef;

  public currentMarker!: Marker;
  public map!: Map;
  constructor(private locationService: LocationService){}

  ngOnInit(): void {
    this.initialiseMap();
  }

  public initialiseMap(): void{
    if(this.map)return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);


    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  public findMyLocation(): void{
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.setMarker(latlng);
      }
    })
  }

  public setMarker(latlng: LatLngExpression): void{
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker){
      this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
      this.currentMarker.setLatLng(latlng);
      return
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  public set addressLatLng(latlng: LatLng){
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }
}
