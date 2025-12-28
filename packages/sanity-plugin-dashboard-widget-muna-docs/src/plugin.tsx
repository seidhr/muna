import Widget from './Widget'
import { DashboardWidget, LayoutConfig } from '@sanity/dashboard'

export type MunaDocsWidgetConfig = { layout?: LayoutConfig }

/**
 * @public
 */
export function munaDocsWidget(config: MunaDocsWidgetConfig): DashboardWidget {
  return {
    name: 'muna-docs-widget',
    component: () => {
      return <Widget {...config} />
    },
    layout: config.layout ?? { width: 'medium' },
  }
}
