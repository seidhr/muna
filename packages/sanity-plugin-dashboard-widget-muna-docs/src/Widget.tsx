import { Card, Heading, Text } from '@sanity/ui'
import { DashboardWidgetContainer } from '@sanity/dashboard'
import { SeidhrLogo } from '@seidhr/react-muna-logo'
import { MunaDocsWidgetConfig } from './plugin'

const Widget = (props: MunaDocsWidgetConfig) => {
  return (
    <DashboardWidgetContainer header="Muna Documentation">
      <Card padding={[2, 2, 3, 3]}>
        <SeidhrLogo style={{ display: 'block', margin: 'auto' }} width="10em" height="10em" />
        <Heading as="h2" size={4} align="center">
          ᛗᚢᚾᚨ
        </Heading>
        <Text>
          <p>
            {' '}
            Muna or ᛗᚢᚾᚨ means remember in norse. Muna is a schema for Sanity that enables detailed
            descriptions of cultural heritage objects and knowledge about their contexts.
          </p>
          <p>
            <a href="https://muna.xyz" target="_blank" rel="noreferrer">
              Muna documentation
            </a>
          </p>
        </Text>
      </Card>
    </DashboardWidgetContainer>
  )
}

export default Widget
