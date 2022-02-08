import { BiTransfer } from 'react-icons/bi';

export default {
  name: 'DataTransferEvent',
  type: 'object',
  title: 'Dataoverføringshendelse',
  titleEN: 'Data transfer event',
  icon: BiTransfer,
  fields: [
    {
      name: 'transferred',
      title: 'Transferred',
      type: 'DigitalObject',
      options: {
        semanticSanity: {
          "@type": "@json"
        }
      },
    },
    {
      name: 'hasSender',
      title: 'Has sender',
      type: 'DigitalDevice',
      options: {
        semanticSanity: {
          "@type": "@json"
        }
      },
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      options: {
        semanticSanity: {
          "@type": "xsd:dateTime"
        }
      },
    },
  ],
}
