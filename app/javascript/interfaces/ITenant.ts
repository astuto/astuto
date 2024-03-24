interface ITenant {
  id: number;
  siteName: string;
  siteLogo: string;
  locale: string;
  customDomain?: string;
}

export default ITenant;