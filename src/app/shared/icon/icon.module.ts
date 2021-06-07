import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faArchive } from '@fortawesome/free-solid-svg-icons/faArchive';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faFrown } from '@fortawesome/free-solid-svg-icons/faFrown';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons/faLaptopHouse';
import { faPaw } from '@fortawesome/free-solid-svg-icons/faPaw';

@NgModule({
  exports: [FontAwesomeModule],
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faStar,
      faTh,
      faFilter,
      faFrown,
      faChevronDown,
      faSync,
      faCircleNotch,
      faChevronLeft,
      faChevronRight,
      faLink,
      faTimes,
      faArchive,
      faBars,
      faCog,
      faChartBar,
      faComments,
      faSearch,
      faPowerOff,
      faGoogle,
      faFacebook,
      faDiscord,
      faExternalLinkAlt,
      faFlag,
      faHeart,
      faCheckCircle,
      faShareAlt,
      faLanguage,
      faKey,
      faUserShield,
      faLock,
      faDownload,
      faBan,
      faChartPie,
      faLaptopHouse,
      faTimesCircle,
      faPaw
    );
  }
}
