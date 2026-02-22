import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsIcon extends Struct.ComponentSchema {
  collectionName: 'components_elements_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {
    iconText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isEnabled: Schema.Attribute.Boolean;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Key: Schema.Attribute.String;
    Value: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    CTA: Schema.Attribute.Component<'elements.link', true>;
    Logo: Schema.Attribute.Component<'elements.logo', false>;
    Name: Schema.Attribute.String;
    Navigations: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.icon': ElementsIcon;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'layout.header': LayoutHeader;
    }
  }
}
