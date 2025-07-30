export type Post = {
  id: number,
  title: {
    en: string
  },
  lead: {
    en: string
  },
  content: {
    en: string
  },
  lead_image: {
    path: string
  }
}

export type ApiResponseContentPosts = {
  success: boolean;
  data: Post[];
}

export type ListItem =  {
  id: string,
  title: string,
  price: string,
  position: {
    lat: number,
    lng: number
  },
  img: {
    src: string
  }
  images: {
    src: string
  }[]
}

export type ListItems =  ListItem[]

export type ListItemConnection = {
  from: string,
  to: string
}

export type ListItemConnections = ListItemConnection[]
