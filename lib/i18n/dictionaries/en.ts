const en = {
  common: {
    siteName: "Rentsy",
    nav: {
      home: "Home",
      browse: "Browse rentals",
      about: "About",
      faq: "FAQs",
      contact: "Contact",
      logIn: "Log in",
      signUp: "Sign up",
      logOut: "Log out",
      myAccount: "My account",
    },
    actions: {
      save: "Save",
      saveChanges: "Save changes",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      publish: "Publish",
      unpublish: "Unpublish",
      search: "Search",
      exploreMore: "Explore more",
    },
    language: "Language",
  },

  footer: {
    tagline:
      "Apartments, houses, and rooms listed directly by owners — no middleman, no platform fees.",
    renters: {
      title: "Renters",
      browse: "Browse listings",
      createAccount: "Create an account",
    },
    owners: {
      title: "Owners",
      list: "List your property",
      dashboard: "Seller dashboard",
    },
    company: {
      title: "Company",
      about: "About us",
      faq: "FAQs",
      contact: "Contact us",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    copyright: "Rentsy. All rights reserved.",
    builtFor: "Built for renters and owners, everywhere.",
  },

  searchBar: {
    placeholder: "City or neighborhood",
    anyType: "Any type",
    propertyTypes: {
      apartment: "Apartment",
      house: "House",
      studio: "Studio",
      villa: "Villa",
      room: "Room",
    },
    search: "Search",
  },

  home: {
    badge: "Free for owners · No hidden fees",
    title: "Find your next place to rent",
    subtitle:
      "Apartments, houses, and rooms listed directly by owners. Browse, message, and arrange your rental — no middleman.",
    listPropertyCta: "Own a property? List it for free →",
    latest: {
      title: "Latest listings",
      subtitle: "Fresh off the market — published directly by owners.",
    },
    features: [
      {
        title: "No platform fees",
        description:
          "List for free and contact owners directly. Rentsy never takes a cut of your rent.",
      },
      {
        title: "Message owners directly",
        description:
          "Ask questions and arrange viewings right from the listing, no phone tag required.",
      },
      {
        title: "Real listings, real owners",
        description:
          "Every account is verified through sign-up, and reviews keep everyone honest.",
      },
    ],
    steps: {
      title: "How it works",
      items: [
        {
          step: "1",
          title: "Search your area",
          description: "Filter by city, neighborhood, price, and number of rooms.",
        },
        {
          step: "2",
          title: "Message the owner",
          description: "Ask questions or request a viewing straight from the listing.",
        },
        {
          step: "3",
          title: "Move in",
          description: "Agree on the details together and arrange your rental directly.",
        },
      ],
    },
    cta: {
      title: "Have a property to rent out?",
      subtitle: "Create a free seller account and publish your listing in minutes.",
      button: "List your property",
    },
  },

  about: {
    badge: "About Us",
    title: "Welcome to Rentsy",
    subtitle:
      "Rentsy is a platform that helps people find homes for rent and allows property owners to list their homes in a simple and easy way. We believe renting should be clear, fair, and affordable.",
    story: {
      title: "Our Story",
      paragraphs: [
        "Rentsy was created by Ay.... Ch...., a university student at Université Moulay Ismail Errachidia who experienced the problems of finding a place to rent.",
        "While searching for housing, Ay.... Ch.... noticed that many rental intermediaries charged high fees without providing good service. This made renting more expensive and more difficult than it should be.",
        "Instead of accepting these problems, Ay.... Ch.... decided to build a platform that would make renting easier for everyone.",
      ],
      punchline: "That idea became Rentsy.",
    },
    mission: {
      title: "Our Mission",
      subtitle: "Our mission is simple:",
      items: [
        "Help people find rental homes more easily.",
        "Help property owners reach more renters.",
        "Reduce unnecessary intermediary fees.",
        "Make renting more transparent and trustworthy.",
        "Create a better rental experience for everyone.",
        "Give students and young renters access to affordable housing.",
      ],
    },
    offer: {
      title: "What We Offer",
      subtitle: "With Rentsy, you can:",
      items: [
        "Search for homes that match your needs.",
        "List your property in just a few steps.",
        "Contact landlords or renters directly.",
        "View clear property information and photos.",
        "Save time during the rental process.",
        "Manage everything from a simple, personal dashboard.",
      ],
      footer:
        "We are always working to improve the platform and add new features that make renting even easier.",
    },
    vision: {
      title: "Our Vision",
      paragraphs: [
        "We want Rentsy to become a trusted place where landlords and renters can connect with confidence.",
        "Our goal is to build a community where people can find homes, list properties, and communicate easily without paying unnecessary fees or dealing with complicated processes.",
      ],
    },
    thanks: {
      title: "Thank you for being here",
      subtitle:
        "Whether you are looking for a new home or want to rent out your property, we are here to help make the process simple, fair, and stress-free.",
      brand: "Rentsy",
      tagline: "Making home renting simple for everyone.",
    },
  },

  auth: {
    testimonial:
      "“Listed my apartment in ten minutes and had three messages from renters by the next morning.”",
    testimonialAuthor: "— A Rentsy property owner",
    highlights: [
      "Free for both renters and property owners",
      "Message owners directly, no middleman",
      "No platform fees, ever",
    ],
    login: {
      title: "Log in",
      subtitle: "Welcome back to Rentsy.",
      email: "Email",
      password: "Password",
      submit: "Log in",
      submitting: "Logging in...",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      callbackError:
        "That confirmation link is invalid or has expired. Log in below, or sign up again if you still need to confirm your email.",
    },
    signup: {
      title: "Create your account",
      subtitle: "Free for both renters and property owners.",
      roleQuestion: "I want to…",
      roleCustomer: "Rent a place",
      roleSeller: "List my property",
      fullName: "Full name",
      fullNamePlaceholder: "Jane Doe",
      email: "Email",
      password: "Password",
      submit: "Create account",
      submitting: "Creating account...",
      haveAccount: "Already have an account?",
      logIn: "Log in",
    },
  },

  listings: {
    propertyTypes: {
      apartment: "Apartment",
      house: "House",
      studio: "Studio",
      villa: "Villa",
      room: "Room",
      office: "Office",
      land: "Land",
      other: "Other",
    },
    browse: {
      title: "Browse listings",
      countSuffix: "available",
      place: "place",
      places: "places",
      inCity: (city: string) => `in "${city}"`,
      emptyTitle: "No listings found",
      emptyDescription:
        "Try a different city, or check back later as more sellers publish properties.",
    },
    detail: {
      forRent: "For rent",
      forSale: "For sale",
      bed: "bed",
      bath: "bath",
      rooms: "rooms",
      about: "About this place",
      amenities: "Features & amenities",
      address: "Address",
      contactTitle: "Contact the owner directly to arrange a viewing.",
      call: "Call",
      whatsapp: "WhatsApp",
      email: "Email",
      noContact: "No contact info was provided for this listing.",
      statusNotice: "This listing is",
      statusNoticeSuffix: "— only you and admins can see it.",
      noPhotos: "No photos yet",
    },
    card: {
      perMonth: "/mo",
      noPhoto: "No photo",
    },
  },

  dashboard: {
    seller: {
      welcome: "Welcome,",
      fallbackName: "seller",
      subtitle: "Manage the properties you list for rent.",
      newListing: "New listing",
      emptyTitle: "No listings yet",
      emptyDescription: "Create your first listing to start hearing from renters.",
      accountSettings: "Account settings",
    },
    admin: {
      title: "Admin dashboard",
      subtitle: "Manage users and moderate listings across Rentsy.",
      totalUsers: "Total users",
      sellers: "Sellers",
      customers: "Customers",
      publishedListings: "Published listings",
      manageUsers: "Manage users",
      moderateListings: "Moderate listings",
      allListingsTitle: "All listings",
      allListingsSubtitle: "listings across the platform.",
      owner: "Owner",
      usersTitle: "Users",
      usersSubtitle: "accounts registered.",
      usersTable: {
        name: "Name",
        email: "Email",
        joined: "Joined",
        role: "Role",
      },
    },
    account: {
      welcome: "Welcome,",
      fallbackName: "there",
      subtitle: "Manage your profile, favorites, messages, and reviews.",
      profileTitle: "Your profile",
      emptyTitle: "Nothing here yet",
      emptyDescription: "Favorites, messaging, and reviews are coming in later phases.",
    },
    rowActions: {
      deleteConfirmTitle: "Delete this listing?",
      deleteConfirmDescription:
        "This permanently removes the listing and its photos. This can't be undone.",
      deleted: "Listing deleted.",
      published: "Listing published.",
      unpublished: "Listing unpublished.",
    },
  },

  editListing: {
    setupTitle: "Set up your listing",
    editTitle: "Edit listing",
    viewPublic: "View public listing →",
    draftBanner:
      "Your listing draft is ready — add photos and details below, then hit Publish when you're happy with it.",
    photos: "Photos",
    details: "Details",
    listingSaved: "Listing saved.",
  },

  listingForm: {
    title: "Title",
    titlePlaceholder: "Bright 2-bedroom near downtown",
    propertyType: "Property type",
    listingType: "Listing type",
    forRent: "For rent",
    forSale: "For sale",
    monthlyRent: "Monthly rent",
    salePrice: "Sale price",
    currency: "Currency",
    selectCurrency: "Select currency",
    country: "Country",
    selectCountry: "Select country",
    searchCountries: "Search countries...",
    noCountryFound: "No country found.",
    city: "City",
    selectCity: "Select city",
    searchCities: "Search cities...",
    noCityFound: "No city found.",
    noCitiesForCountry: "No cities listed for this country yet — choose Other to add yours.",
    neighborhood: "Neighborhood / area",
    neighborhoodPlaceholder: "Maarif",
    address: "Address (optional)",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    rooms: "Total rooms",
    description: "Description",
    descriptionPlaceholder: "Describe the place, nearby transit, house rules...",
    extraFeatures: "Extra features",
    extraFeaturesHint: "Amenities, appliances, and more",
    selectedCountTemplate: "{count} selected",
    selectEverything: "Select everything this place offers.",
    contactSectionTitle: "Contact info shown to renters",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    saving: "Saving...",
    saveChanges: "Save changes",
    listingSaved: "Listing saved.",
    otherTypeYourOwn: "Other (type your own)",
    chooseFromList: "Choose from list",
  },

  amenities: {
    wifi: "WiFi",
    parking: "Parking",
    air_conditioning: "Air conditioning",
    heating: "Heating",
    washing_machine: "Washing machine",
    kitchen: "Kitchen",
    tv: "TV",
    elevator: "Elevator",
    balcony: "Balcony",
    garden: "Garden",
    pool: "Pool",
    gym: "Gym",
    pet_friendly: "Pet friendly",
    furnished: "Furnished",
    security: "24/7 security",
    wheelchair_accessible: "Wheelchair accessible",
  },

  legal: {
    lastUpdated: "Last updated",
    terms: { title: "Terms of Service" },
    privacy: { title: "Privacy Policy" },
  },

  faq: {
    badge: "FAQs",
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about renting and listing on Rentsy.",
    viewAll: "View all FAQs",
    stillHaveQuestions: "Still have questions?",
    contactCtaText: "Can't find the answer you're looking for? Our team is happy to help.",
    contactCta: "Contact us",
    items: [
      {
        question: "Is Rentsy free to use?",
        answer:
          "Yes. Browsing listings and messaging owners is free for renters, and creating a seller account to list your property is free as well. Rentsy never takes a cut of your rent.",
      },
      {
        question: "How do I list my property?",
        answer:
          "Create a free seller account, choose \"List my property\" during signup, then fill in your listing details — photos, price, location, and contact info. Your listing publishes immediately, no approval wait.",
      },
      {
        question: "Does Rentsy handle payments or contracts?",
        answer:
          "No. Rentsy is a listings marketplace, not a booking platform. Renters and owners connect directly through the listing and arrange viewings, rental terms, and payments themselves, off-platform.",
      },
      {
        question: "How do I contact a property owner?",
        answer:
          "Open any listing and use the call, WhatsApp, or email details the owner provided to reach out directly and arrange a viewing.",
      },
      {
        question: "Can I edit or unpublish my listing after it's live?",
        answer:
          "Yes. From your seller dashboard you can edit any listing's details and photos at any time, and publish or unpublish it whenever you like.",
      },
      {
        question: "What information do I need to sign up?",
        answer:
          "Just your name, email, and a password. Choose whether you're renting or listing a property, and you're ready to go.",
      },
      {
        question: "Is my information safe on Rentsy?",
        answer:
          "We only ask for what's needed to create your account and list or search for properties. Contact details you add to a listing are shown to renters so they can reach you directly — never share sensitive information like passwords or payment details through messages.",
      },
      {
        question: "Can I use Rentsy outside Morocco?",
        answer:
          "Yes. Rentsy started in Morocco but supports listings worldwide — pick your country, city, and preferred currency when creating a listing.",
      },
      {
        question: "Can I change the site language?",
        answer:
          "Yes. Use the language switcher in the top navigation bar to switch between English and Arabic at any time.",
      },
    ],
  },

  contact: {
    badge: "Contact us",
    title: "Get in touch",
    subtitle:
      "Have a question, feedback, or ran into an issue? We'd love to hear from you.",
    emailTitle: "Email us",
    emailDescription: "The fastest way to reach our team.",
    faqTitle: "Check the FAQs",
    faqDescription: "Many common questions are already answered there.",
    faqCta: "Browse FAQs",
  },

  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or may have moved.",
    backHome: "Back to home",
  },

  confirmed: {
    title: "Email confirmed!",
    welcomeBack: (name: string) => `Welcome to Rentsy, ${name}. Your account is ready.`,
    fallbackName: "there",
    confirmedLoggedOut: "Your account is confirmed. Log in to continue.",
    goToAdminDashboard: "Go to admin dashboard",
    addYourListing: "Add your listing",
    startBrowsing: "Start browsing",
    logIn: "Log in",
  },

  profileMenu: {
    addNewListing: "Add new listing",
    myListings: "My listings",
    accountSettings: "Account settings",
    adminDashboard: "Admin dashboard",
    manageListings: "Manage listings",
    manageUsers: "Manage users",
  },

  profileForm: {
    fullName: "Full name",
    phone: "Phone",
    whatsapp: "WhatsApp",
    saving: "Saving...",
    saveChanges: "Save changes",
    updated: "Profile updated.",
  },

  authErrors: {
    over_email_send_rate_limit:
      "We've sent too many emails in a short time. Please wait a few minutes and try again.",
    over_request_rate_limit:
      "Too many attempts. Please wait a moment and try again.",
    email_exists:
      "An account with this email already exists. Try logging in instead.",
    user_already_exists:
      "An account with this email already exists. Try logging in instead.",
    email_address_invalid: "Enter a valid email address.",
    weak_password: "Choose a stronger password.",
    email_not_confirmed:
      "Please confirm your email before logging in — check your inbox (and spam folder) for the confirmation link.",
    invalid_credentials:
      "Invalid email or password. If you just signed up, check your inbox to confirm your email first.",
    signupSuccess:
      "Account created. Check your email to confirm it before logging in.",
    invalidInput: "Invalid input.",
  },
}

export default en
export type Dictionary = typeof en
