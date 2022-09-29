/**
 * Define all api urls and their supported versions
 */
export const AppSettings = {
  apis: {
    nb: {
      v1: {
        type: "REST",
        url: "https://api.nb.no/catalog/v1/items/?",
      }
    },
    kulturnav: {
      latest: {
        type: "REST",
        url: "https://kulturnav.org/api",
      }
    },
    marcus: {
      latest: {
        type: "elasticsearch",
        url: "https://jambo.uib.no/elasticsearch",
      }
    },
    skeivtarkiv: {
      latest: {
        type: "elasticsearch",
        url: "https://jambo.uib.no/elasticsearch",
      }
    }
  }
} as const