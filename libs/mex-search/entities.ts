import { ILink } from '@workduck-io/mex-utils'

import { SearchX } from './src/searchX'
// import { Entities } from './src/utils'

const content = [
  {
    type: 'h1',
    id: 'TEMP_MfcDJ',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181496152,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181496152
    },
    children: [{ type: 'p', id: 'TEMP_BiyF8', metadata: {}, text: 'Hello this is an h1' }]
  },
  {
    type: 'h3',
    id: 'TEMP_YyWfV',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_EHhhV', metadata: {}, text: 'Basic Text Elements' }]
  },
  {
    type: 'p',
    id: 'TEMP_ntK3m',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180399324,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_t6PB7',
        metadata: {},
        text: 'This is some standard paragraph like content. It also includes shit like '
      },
      { type: 'p', id: 'TEMP_VzMKB', metadata: {}, italic: true, text: 'italics, ' },
      { type: 'p', id: 'TEMP_z6k7g', metadata: {}, bold: true, text: 'bold' },
      { type: 'p', id: 'TEMP_TEn3E', metadata: {}, text: ', ' },
      { type: 'p', id: 'TEMP_qmRpz', metadata: {}, strikethrough: true, text: 'strikethrough ' },
      { type: 'p', id: 'TEMP_q6Mpw', metadata: {}, text: 'so as to include all basic formatting types. ' }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_QxAQ9',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180399324,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [{ type: 'p', id: 'TEMP_tL873', metadata: {}, text: '' }]
  },
  {
    type: 'p',
    id: 'TEMP_jyxkP',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701426,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [
      { type: 'p', id: 'TEMP_zP63b', metadata: {}, text: 'We could also tests things like ' },
      {
        type: 'tag',
        id: 'TEMP_TLCmQ',
        metadata: {},
        value: 'wowtag',
        children: [{ type: 'p', id: 'TEMP_68xVR', metadata: {}, text: '' }]
      },
      { type: 'p', id: 'TEMP_NbRtK', metadata: {}, text: ' and mentions such as ' },
      {
        type: 'mention',
        id: 'TEMP_pRCBp',
        metadata: {},
        value: 'cfcf50de-d37e-41f2-b650-829d540f2d26',
        children: [{ type: 'p', id: 'TEMP_eDbek', metadata: {}, text: '' }]
      },
      { type: 'p', id: 'TEMP_wXDqP', metadata: {}, text: '' }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_g8aYA',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180399324,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [
      { type: 'p', id: 'TEMP_NaUBw', metadata: {}, text: 'There are also backlinks so ' },
      {
        type: 'ilink',
        value: 'NODE_T8Vh6tqWae9MjrQyEyXjr',
        id: 'TEMP_CUtrh',
        children: [{ text: '', id: 'TEMP_cBHfb' }]
      },
      { type: 'p', id: 'TEMP_4VGwc', metadata: {}, text: ' will be included' }
    ]
  },
  {
    type: 'h3',
    id: 'TEMP_y4aNk',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_HpcYF', metadata: {}, text: 'Lists' }]
  },
  {
    type: 'h4',
    id: 'TEMP_7kLGG',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701426,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [{ type: 'p', id: 'TEMP_p93G4', metadata: {}, text: 'Numbered Lists' }]
  },
  {
    type: 'ol',
    id: 'TEMP_7FqcQ',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468361,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180399324
    },
    children: [
      {
        type: 'li',
        id: 'TEMP_yKtqt',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_3T4Ct',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_b6Fqf',
                metadata: {},
                text: ' This is a numbered list so entry number 1'
              }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_CRTXF',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_t6PYh',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_b6Fqf',
                metadata: {},
                text: 'This is another list entry but with a '
              },
              {
                type: 'tag',
                id: 'TEMP_ha89y',
                metadata: {},
                value: 'hashtag',
                children: [{ type: 'p', id: 'TEMP_hr6Nz', metadata: {}, text: '' }]
              },
              { type: 'p', id: 'TEMP_YBaWU', metadata: {}, text: '' }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_NLMFT',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_pbVqY',
            metadata: {},
            children: [
              { type: 'p', id: 'TEMP_b6Fqf', metadata: {}, text: 'Aur ek but now with ' },
              {
                type: 'mention',
                id: 'TEMP_JATGd',
                metadata: {},
                value: 'cfcf50de-d37e-41f2-b650-829d540f2d26',
                children: [{ type: 'p', id: 'TEMP_7thMd', metadata: {}, text: '' }]
              },
              { type: 'p', id: 'TEMP_jkhfa', metadata: {}, text: ' and a ' },
              {
                type: 'tag',
                id: 'TEMP_yA8Kr',
                metadata: {},
                value: 'hashtag',
                children: [{ type: 'p', id: 'TEMP_bfxJw', metadata: {}, text: '' }]
              },
              { type: 'p', id: 'TEMP_jkhfa', metadata: {}, text: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'h4',
    id: 'TEMP_P4fQd',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_jkhfa', metadata: {}, text: 'Unordered Lists' }]
  },
  {
    type: 'ul',
    id: 'TEMP_xccMR',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468361,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [
      {
        type: 'li',
        id: 'TEMP_BRNEw',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_jnHPd',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_htCt9',
                metadata: {},
                text: 'This is an unordered list, pretty much the same as a numbered list'
              }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_HFU78',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_GPpfA',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_htCt9',
                metadata: {},
                text: "But the items don't have a number index"
              }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_Twh7f',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_qEb8X',
            metadata: {},
            children: [
              { type: 'p', id: 'TEMP_htCt9', metadata: {}, text: 'Even if they do in ' },
              {
                type: 'tag',
                id: 'TEMP_hx8Ng',
                metadata: {},
                value: 'code',
                children: [{ type: 'p', id: 'TEMP_PcxUP', metadata: {}, text: '' }]
              },
              { type: 'p', id: 'TEMP_wDV4D', metadata: {}, text: ", it isn't visible yaaay" }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_8t8K3',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_UXgFM',
            metadata: {},
            children: [{ type: 'p', id: 'TEMP_wDV4D', metadata: {}, text: 'They could also be nested so:' }]
          },
          {
            type: 'ul',
            id: 'TEMP_jcQL8',
            metadata: {},
            children: [
              {
                type: 'li',
                id: 'TEMP_zGKmQ',
                metadata: {},
                children: [
                  {
                    type: 'lic',
                    id: 'TEMP_n4Q9t',
                    metadata: {},
                    children: [{ type: 'p', id: 'TEMP_wDV4D', metadata: {}, text: 'This is 4.1' }]
                  }
                ]
              },
              {
                type: 'li',
                id: 'TEMP_gAiaX',
                metadata: {},
                children: [
                  {
                    type: 'lic',
                    id: 'TEMP_yVmDa',
                    metadata: {},
                    children: [{ type: 'p', id: 'TEMP_wDV4D', metadata: {}, text: '4.2 yo' }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'h3',
    id: 'TEMP_tWzAJ',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_3ynJA', metadata: {}, text: 'Media Elements' }]
  },
  {
    type: 'p',
    id: 'TEMP_LGmWX',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [
      { type: 'p', id: 'TEMP_nnYzG', metadata: {}, text: 'This includes things like URLs: ' },
      {
        type: 'a',
        url: 'https://workduck.io/',
        id: 'TEMP_zCMiU',
        children: [{ type: 'p', id: 'TEMP_nnYzG', metadata: {}, text: 'https://workduck.io/' }]
      },
      { type: 'p', id: 'TEMP_LnYyD', metadata: {}, text: '' }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_e4pJf',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [
      { type: 'p', id: 'TEMP_WVQBP', metadata: {}, text: '' },
      {
        type: 'a',
        url: 'https://stackskb.com/',
        id: 'TEMP_hQJmh',
        children: [{ type: 'p', id: 'TEMP_WVQBP', metadata: {}, text: 'https://stackskb.com/' }]
      },
      { type: 'p', id: 'TEMP_8HPgM', metadata: {}, text: '' }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_rUVDy',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [
      { type: 'p', id: 'TEMP_kDkdf', metadata: {}, text: 'ILinks also count as links, so ' },
      {
        type: 'ilink',
        value: 'NODE_3YrnPq3gfyJJDydiQyekc',
        id: 'TEMP_NEY6i',
        children: [{ text: '', id: 'TEMP_A7d9K' }]
      },
      { type: 'p', id: 'TEMP_jLmcW', metadata: {}, text: '' }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_889gY',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_LMQEn', metadata: {}, text: 'Media Embeds are also links' }]
  },
  {
    type: 'p',
    id: 'TEMP_Be4rW',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_G3CPi', metadata: {}, text: '' }]
  },
  {
    type: 'media_embed',
    id: 'TEMP_YwRBG',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    url: 'https://workduck.io/',
    children: [{ type: 'p', id: 'TEMP_YfQ38', metadata: {}, text: '' }]
  },
  {
    type: 'p',
    id: 'TEMP_QVaXn',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_bkxFD', metadata: {}, text: '' }]
  },
  {
    type: 'p',
    id: 'TEMP_nwkxY',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_JxECq', metadata: {}, text: '' }]
  },
  {
    type: 'h3',
    id: 'TEMP_GhAgB',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_JzcXP', metadata: {}, text: 'Excalidraw' }]
  },
  {
    type: 'p',
    id: 'TEMP_ew3Gm',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_Ux6cC',
        metadata: {},
        text: "There is no support for excalidraw on web hehe, so can't test rn but it def works. Need to add the editor element to web editor"
      }
    ]
  },
  {
    type: 'h3',
    id: 'TEMP_f8ztU',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180701393,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_BbHnx', metadata: {}, text: 'Images' }]
  },
  {
    type: 'img',
    id: 'TEMP_WrKmW',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180846516,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180846516
    },
    url: 'https://cdn.workduck.io/public/TE6f-UQqN-Ckpq-btcJdt3F',
    caption: [{ text: "RIP Jeff Beck; Let's test captions too" }],
    children: [{ type: 'p', id: 'TEMP_z3DcP', metadata: {}, text: '' }]
  },
  {
    type: 'h3',
    id: 'TEMP_DdM4y',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180846553,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180701393
    },
    children: [{ type: 'p', id: 'TEMP_8bjcj', metadata: {}, text: 'Reminders' }]
  },
  {
    type: 'p',
    id: 'TEMP_LGkmG',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180846516,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180846516
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_pWyMW',
        metadata: {},
        text: "Although reminders aren't a part of the node, they are still entities and we need to parse before we can index"
      }
    ]
  },
  {
    type: 'h3',
    id: 'TEMP_LTFc6',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180940021,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180940021
    },
    children: [{ type: 'p', id: 'TEMP_Anq4t', metadata: {}, text: 'Tasks' }]
  },
  {
    type: 'action_item',
    id: 'TEMP_3EPef',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180940021,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180940021
    },
    children: [
      { type: 'p', id: 'TEMP_Gbb4L', metadata: {}, text: 'Tasks are considered ' },
      { type: 'p', id: 'TEMP_pHH7r', metadata: {}, code: true, text: 'action_items' },
      { type: 'p', id: 'TEMP_ggwwC', metadata: {}, text: ' by the editor' }
    ]
  },
  {
    type: 'action_item',
    id: 'TEMP_xyndk',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180940021,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180940021
    },
    children: [
      { type: 'p', id: 'TEMP_HcRWF', metadata: {}, text: 'They support things like ' },
      {
        type: 'tag',
        id: 'TEMP_BX9B7',
        metadata: {},
        value: 'wowtag',
        children: [{ type: 'p', id: 'TEMP_W4Cf4', metadata: {}, text: '' }]
      },
      { type: 'p', id: 'TEMP_nJ9yr', metadata: {}, text: ' and ' },
      {
        type: 'mention',
        id: 'TEMP_hbEmn',
        metadata: {},
        value: 'cfcf50de-d37e-41f2-b650-829d540f2d2',
        children: [{ type: 'p', id: 'TEMP_WWdd3', metadata: {}, text: '' }]
      },
      { type: 'p', id: 'TEMP_gBKQe', metadata: {}, text: "since they're standard editor elements" }
    ]
  },
  {
    type: 'action_item',
    id: 'TEMP_6YaA4',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468361,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180940021
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_YWXBT',
        metadata: {},
        text: "There isn't support for nested tasks currently"
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_fEQQd',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674180846516,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674180846516
    },
    children: [{ type: 'p', id: 'TEMP_CpDFP', metadata: {}, text: '' }]
  },
  {
    type: 'h3',
    id: 'TEMP_TPjiU',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [{ type: 'p', id: 'TEMP_Upnqx', metadata: {}, text: 'Table' }]
  },
  {
    type: 'table',
    id: 'TEMP_xYVXb',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [
      {
        type: 'tr',
        id: 'TEMP_KVxJV',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_HCTmh',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_MEVt3',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_AD69q', metadata: {}, bold: true, text: 'Index' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_ggAgC',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_QYNn7',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_YgQtV', metadata: {}, bold: true, text: 'Value' }]
              }
            ]
          }
        ]
      },
      {
        type: 'tr',
        id: 'TEMP_7NeTf',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_nQAwj',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_agkcp',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_LHwya', metadata: {}, bold: true, text: 'Type' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_mTKBG',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_dTCFW',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_XMMWB', metadata: {}, bold: true, text: 'Simple Table' }]
              }
            ]
          }
        ]
      },
      {
        type: 'tr',
        id: 'TEMP_hmbeE',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_NpBch',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_B7kM9',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_VkQan', metadata: {}, bold: true, text: 'Rows' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_pRpU8',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_xfnGV',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_manaz', metadata: {}, bold: true, text: '4' }]
              }
            ]
          }
        ]
      },
      {
        type: 'tr',
        id: 'TEMP_iTqfT',
        metadata: {},
        children: [
          {
            type: 'td',
            id: 'TEMP_m3rtX',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_EPVmf',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_eEnQz', metadata: {}, bold: true, text: 'Columns' }]
              }
            ]
          },
          {
            type: 'td',
            id: 'TEMP_UqHjK',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_raXDj',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_fpRtz', metadata: {}, bold: true, text: '2' }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_qTdYr',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [{ type: 'p', id: 'TEMP_4TibH', metadata: {}, text: '' }]
  },
  {
    type: 'p',
    id: 'TEMP_hQrtG',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_JQfyF',
        metadata: {},
        text: 'Tables could be complex and include things like tasks'
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_Ayxke',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [{ type: 'p', id: 'TEMP_HVahm', metadata: {}, text: '' }]
  },
  {
    type: 'table',
    id: 'TEMP_64QTB',
    metadata: {
      lastEditedBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      updatedAt: 1674181468328,
      createdBy: '53476ce0-b5ea-4bf3-8bea-eda3009cfa50',
      createdAt: 1674181468328
    },
    children: [
      {
        type: 'tr',
        id: 'TEMP_K4cHU',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_rztmf',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_qxyAp',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_aFKPH', metadata: {}, text: 'Index' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_7q39N',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_H63rK',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_yzwKn', metadata: {}, text: 'Content' }]
              }
            ]
          }
        ]
      },
      {
        type: 'tr',
        id: 'TEMP_7BJJD',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_aaAi4',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_VEGa9',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_PfPhY', metadata: {}, text: '1' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_TncMa',
            metadata: {},
            children: [
              {
                type: 'action_item',
                id: 'TEMP_7Q8VK',
                metadata: {},
                children: [
                  {
                    type: 'p',
                    id: 'TEMP_z8r9h',
                    metadata: {},
                    text: "We're not normies so we ain't numbering from 0"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'tr',
        id: 'TEMP_4K7tm',
        metadata: {},
        children: [
          {
            type: 'th',
            id: 'TEMP_C934W',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_AzyGU',
                metadata: {},
                children: [{ type: 'p', id: 'TEMP_dGfwT', metadata: {}, text: '2' }]
              }
            ]
          },
          {
            type: 'th',
            id: 'TEMP_4L9g4',
            metadata: {},
            children: [
              {
                type: 'action_item',
                id: 'TEMP_VGTek',
                metadata: {},
                children: [
                  {
                    type: 'p',
                    id: 'TEMP_eV9Pz',
                    metadata: {},
                    text: 'Haha another task in table but with '
                  },
                  {
                    type: 'tag',
                    id: 'TEMP_HynDD',
                    metadata: {},
                    value: 'hashtag',
                    children: [{ type: 'p', id: 'TEMP_kt3jp', metadata: {}, text: '' }]
                  },
                  { type: 'p', id: 'TEMP_Ngqhr', metadata: {}, text: ' and ' },
                  {
                    type: 'mention',
                    id: 'TEMP_KTQt3',
                    metadata: {},
                    value: 'cfcf50de-d37e-41f2-b650-829d540f2d26',
                    children: [{ type: 'p', id: 'TEMP_6yfgr', metadata: {}, text: '' }]
                  },
                  { type: 'p', id: 'TEMP_mLj4W', metadata: {}, text: '' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

const newContent = [
  {
    type: 'h2',
    id: 'TEMP_rALJ8',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1674916956180,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1674916956180,
      elementMetadata: {
        type: 'highlightV1',
        id: 'HIGHLIGHT_Pwe8kMEfkgnnraXpX9CJX'
      }
    },
    align: 'left',
    children: [
      {
        type: 'p',
        id: 'TEMP_3rbLL',
        metadata: {},
        bold: true,
        text: 'The 5 questions every great story answers'
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_fcD7H',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1675427919233,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1674916956180,
      elementMetadata: {
        type: 'highlightV1',
        id: 'HIGHLIGHT_Pwe8kMEfkgnnraXpX9CJX'
      }
    },
    align: 'left',
    children: [
      {
        type: 'p',
        id: 'TEMP_xbiDb',
        metadata: {},
        text: ' “Remember, the essence of '
      },
      {
        type: 'a',
        url: 'https://workduck.io/',
        id: 'TEMP_WEB4f',
        children: [
          {
            type: 'p',
            id: 'TEMP_idNan',
            metadata: {},
            text: 'storytelling'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_U3tJD',
        metadata: {},
        text: ' demands that we place our main characters on a path. A quest with something at stake, with something to do, to achieve, to learn, and to change.” — Larry Brook'
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_QHYMd',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1675427919198,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1675427919198,
      elementMetadata: {
        type: 'highlightV1',
        id: 'HIGHLIGHT_Pwe8kMEfkgnnraXpX9CJX'
      }
    },
    align: 'left',
    children: [
      {
        type: 'p',
        id: 'TEMP_mhhHV',
        metadata: {},
        text: ''
      }
    ]
  },
  {
    type: 'ul',
    id: 'TEMP_GwGhF',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1675427919198,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1675427919198
    },
    children: [
      {
        type: 'li',
        id: 'TEMP_TjJLU',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_G3CeV',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_ATQUf',
                metadata: {},
                text: 'I am god'
              }
            ]
          },
          {
            type: 'ul',
            id: 'TEMP_G7Hqb',
            metadata: {},
            children: [
              {
                type: 'li',
                id: 'TEMP_6rQPk',
                metadata: {},
                children: [
                  {
                    type: 'lic',
                    id: 'TEMP_LfAAg',
                    metadata: {},
                    children: [
                      {
                        type: 'p',
                        id: 'TEMP_ATQUf',
                        metadata: {},
                        text: 'or so he thought'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'li',
                id: 'TEMP_8qkDe',
                metadata: {},
                children: [
                  {
                    type: 'lic',
                    id: 'TEMP_eCPBi',
                    metadata: {},
                    children: [
                      {
                        type: 'p',
                        id: 'TEMP_ATQUf',
                        metadata: {},
                        text: 'What is this bullshit '
                      },
                      {
                        type: 'tag',
                        id: 'TEMP_wMwiz',
                        metadata: {},
                        value: 'wowtag',
                        children: [
                          {
                            type: 'p',
                            id: 'TEMP_hgcqe',
                            metadata: {},
                            text: ''
                          }
                        ]
                      },
                      {
                        type: 'p',
                        id: 'TEMP_NVbXA',
                        metadata: {},
                        text: ''
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'li',
        id: 'TEMP_LfQUb',
        metadata: {},
        children: [
          {
            type: 'lic',
            id: 'TEMP_gdtTC',
            metadata: {},
            children: [
              {
                type: 'p',
                id: 'TEMP_ATQUf',
                metadata: {},
                text: 'I am neother good nor bad '
              },
              {
                type: 'tag',
                id: 'TEMP_7hzth',
                metadata: {},
                value: 'hashtag',
                children: [
                  {
                    type: 'p',
                    id: 'TEMP_zbdmX',
                    metadata: {},
                    text: ''
                  }
                ]
              },
              {
                type: 'p',
                id: 'TEMP_nzpNt',
                metadata: {},
                text: ''
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_nTBxA',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1675427919198,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1675427919198
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_ATQUf',
        metadata: {},
        text: ''
      }
    ]
  },
  {
    type: 'p',
    id: 'TEMP_tWnWT',
    metadata: {
      lastEditedBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      updatedAt: 1675427919198,
      createdBy: 'fd243065-e641-4471-9e0a-3a510acbdfc1',
      createdAt: 1675427919198
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_kdbED',
        metadata: {},
        text: 'My mother left me when I was 6 '
      },
      {
        type: 'tag',
        id: 'TEMP_YGYdk',
        metadata: {},
        value: 'code',
        children: [
          {
            type: 'p',
            id: 'TEMP_GWg8E',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_NADYz',
        metadata: {},
        text: ''
      }
    ]
  }
]

const superBlockContent = [
  {
    type: 'super-block-task',
    id: 'TEMP_yTFjV',
    metadata: {
      updatedBy: '7b73e65a-3745-45fc-8cb0-fce6b54197bd',
      updatedAt: 1688040194326,
      createdBy: '7b73e65a-3745-45fc-8cb0-fce6b54197bd',
      createdAt: 1687437822100,
      properties: {
        entity: {
          active: 'super-block-task',
          values: {
            'super-block-task': {
              id: 'TASK_12',
              parent: 'TASK_1'
            }
          }
        },
        status: 'todo',
        tags: [
          {
            value: 'meeting'
          }
        ],
        assignee: '7b73e65a-3745-45fc-8cb0-fce6b54197bd',
        priority: 'low'
      }
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_Q9n9d',
        children: [
          {
            type: 'p',
            id: 'TEMP_dGp9p',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'action_item',
        id: 'TEMP_YUAMF',
        status: 'completed',
        children: [
          {
            type: 'p',
            id: 'TEMP_MFApB',
            metadata: {},
            text: 'Add Task component in Super Blocks'
          }
        ]
      },
      {
        type: 'action_item',
        id: 'TEMP_d9yYP',
        status: 'pending',
        children: [
          {
            type: 'p',
            id: 'TEMP_bjTdp',
            metadata: {},
            text: 'Checklist would be a separate element type instead of saving it inside Super Tasks.'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_f73gT',
        children: [
          {
            type: 'p',
            id: 'TEMP_GMVx9',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_GAz9h',
        children: [
          {
            type: 'p',
            id: 'TEMP_3gKL6',
            metadata: {},
            text: "I can even add more tasks here, but let's keep those separate."
          }
        ]
      }
    ]
  },
  {
    type: 'super-block-content',
    id: 'TEMP_YM6Y4',
    metadata: {
      updatedBy: '7b73e65a-3745-45fc-8cb0-fce6b54197bd',
      updatedAt: 1688041249795,
      createdBy: '7b73e65a-3745-45fc-8cb0-fce6b54197bd',
      createdAt: 1687862620219,
      properties: {
        tags: [
          {
            value: 'meeting'
          },
          {
            value: 'quickcapture'
          }
        ]
      }
    },
    children: [
      {
        type: 'p',
        id: 'TEMP_HwH3R',

        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_cFNNJ',
            bold: true,
            text: 'Dust '
          },
          {
            type: 'p',
            id: 'TEMP_t9bnx',
            text: 'a new'
          },
          {
            type: 'p',
            id: 'TEMP_zz6Pf',
            text: ' '
          },
          {
            type: 'p',
            id: 'TEMP_nrKJ7',
            text: 'AI startup based in France that is working on improving team productivity by breaking down internal silos, surfacing important knowledge and providing tools to build custom internal apps. At its core, Dust is using large language models (LLMs) on internal company data to give new super powers to team members.'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_NYkhT',

        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_xnWKE',
            text: 'Co-founded by Gabriel Hubert and Stanislas Polu, the pair has known each other for more than a decade. Their first startup called Totems was acquired by Stripe in 2015. After that, they both spent a few years working for Stripe before parting ways.'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_jti3p',

        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_AnpNA',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_HU8HG',

        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_f7yVA',
            metadata: {},
            text: "Stanislas Polu joined OpenAI where he spent three years working on LLMs' reasoning capabilities while Gabriel Hubert became the head of product at"
          },
          {
            type: 'p',
            id: 'TEMP_tTrCT',
            metadata: {},
            text: ' '
          },
          {
            type: 'a',
            url: 'https://alan.com/',
            id: 'TEMP_BzVCW',
            children: [
              {
                type: 'p',
                id: 'TEMP_dDhma',
                metadata: {},
                text: 'Alan'
              }
            ]
          },
          {
            type: 'p',
            id: 'TEMP_xfEKx',
            metadata: {},
            text: '. '
          },
          {
            type: 'p',
            id: 'TEMP_Pj6nk',
            metadata: {},
            text: "They teamed up once again to create Dust. Unlike many AI startups, Dust isn't focused on creating new large language models. Instead, the company wants to build applications on top of LLMs developed by OpenAI, Cohere, AI21, etc."
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_atJzY',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_dbLcW',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_6zRbA',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_EWi7m',
            metadata: {},
            text: 'The team first worked on a'
          },
          {
            type: 'p',
            id: 'TEMP_rcCdT',
            metadata: {},
            text: ' '
          },
          {
            type: 'a',
            url: 'https://github.com/dust-tt/dust',
            id: 'TEMP_3YbqL',
            children: [
              {
                type: 'p',
                id: 'TEMP_tie77',
                metadata: {},
                text: 'platform'
              }
            ]
          },
          {
            type: 'p',
            id: 'TEMP_wtmMy',
            metadata: {},
            text: ' '
          },
          {
            type: 'p',
            id: 'TEMP_CTAxw',
            metadata: {},
            text: 'that can be used to design and deploy large language model apps. It has then focused its efforts on one use case in particular — centralizing and indexing internal data so that it can be used by LLMs.'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_xxAHj',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_QxdhG',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'h2',
        id: 'TEMP_KcFR6',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_4Uz3d',
            metadata: {},
            text: 'From an internal ChatGPT to next-gen software'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_6fNXf',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_NGwY9',
            metadata: {},
            text: 'There are a handful of connectors that constantly fetch internal data from Notion, Slack, Github and Google Drive. This data is then indexed and can be used for semantic search queries. When a user wants to do something with a Dust-powered app, Dust will find the relevant internal data, use it as the context of an LLM and return an answer.'
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_Fqp4P',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_cTWYH',
            metadata: {},
            text: "For example, let's say you just joined a company and you're working on a project that was started a while back. If your company fosters communication transparency, you will want to find information in existing internal data. But the internal knowledge base might not be up to date. Or it might be hard to find the reason why something is done this way as it's been discussed in an archived Slack channel."
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_FnCVP',
        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_QcyFQ',
            metadata: {},
            text: ''
          }
        ]
      },
      {
        type: 'p',
        id: 'TEMP_mW3mY',

        align: 'start',
        children: [
          {
            type: 'p',
            id: 'TEMP_AX7Eh',
            metadata: {},
            text: "Dust isn't just a better internal search tool as it doesn't just return search results. It can find information across multiple data sources and format answers in a way that is much more useful to you. It can be used as a sort of internal ChatGPT, but it could also be used as the basis of new internal tools."
          }
        ]
      }
    ]
  }
]
const extra = {
  ilink: {
    keyToIndex: 'value',
    replacements: {
      NODE_3YrnPq3gfyJJDydiQyekc: 'dev',
      NODE_T8Vh6tqWae9MjrQyEyXjr: 'design',
      NODE_eyHfLFkYr9ALnVq3gE8U6: 'doc',
      NODE_T69BycnnEi47FeJTQbtgr: 'Daily Tasks',
      NODE_hBhXiaBpR9qKAfAhdFifW: 'Links',
      NODE_PefiP9JNqXM7BHGAULwEn: 'Meeting',
      NODE_nNYQhNg6TNWWapAfpB7LX: 'Drafts',
      NODE_EMhwh7FWy3AdJz4rbjD9V: 'Onboarding',
      NODE_jjtnMNJwLJ6bMaBMLApM4: 'Sample Note'
    }
  },
  inline_block: {
    keyToIndex: 'value',
    replacements: {
      NODE_3YrnPq3gfyJJDydiQyekc: 'dev',
      NODE_T8Vh6tqWae9MjrQyEyXjr: 'design',
      NODE_eyHfLFkYr9ALnVq3gE8U6: 'doc',
      NODE_T69BycnnEi47FeJTQbtgr: 'Daily Tasks',
      NODE_hBhXiaBpR9qKAfAhdFifW: 'Links',
      NODE_PefiP9JNqXM7BHGAULwEn: 'Meeting',
      NODE_nNYQhNg6TNWWapAfpB7LX: 'Drafts',
      NODE_EMhwh7FWy3AdJz4rbjD9V: 'Onboarding',
      NODE_jjtnMNJwLJ6bMaBMLApM4: 'Sample Note'
    }
  },
  task_view_link: {
    keyToIndex: 'value',
    replacements: {
      NODE_3YrnPq3gfyJJDydiQyekc: 'dev',
      NODE_T8Vh6tqWae9MjrQyEyXjr: 'design',
      NODE_eyHfLFkYr9ALnVq3gE8U6: 'doc',
      NODE_T69BycnnEi47FeJTQbtgr: 'Daily Tasks',
      NODE_hBhXiaBpR9qKAfAhdFifW: 'Links',
      NODE_PefiP9JNqXM7BHGAULwEn: 'Meeting',
      NODE_nNYQhNg6TNWWapAfpB7LX: 'Drafts',
      NODE_EMhwh7FWy3AdJz4rbjD9V: 'Onboarding',
      NODE_jjtnMNJwLJ6bMaBMLApM4: 'Sample Note'
    }
  },
  task_view_block: {
    keyToIndex: 'value',
    replacements: {
      NODE_3YrnPq3gfyJJDydiQyekc: 'dev',
      NODE_T8Vh6tqWae9MjrQyEyXjr: 'design',
      NODE_eyHfLFkYr9ALnVq3gE8U6: 'doc',
      NODE_T69BycnnEi47FeJTQbtgr: 'Daily Tasks',
      NODE_hBhXiaBpR9qKAfAhdFifW: 'Links',
      NODE_PefiP9JNqXM7BHGAULwEn: 'Meeting',
      NODE_nNYQhNg6TNWWapAfpB7LX: 'Drafts',
      NODE_EMhwh7FWy3AdJz4rbjD9V: 'Onboarding',
      NODE_jjtnMNJwLJ6bMaBMLApM4: 'Sample Note'
    }
  },
  mention: {
    keyToIndex: 'value',
    replacements: {
      'USER_53476ce0-b5ea-4bf3-8bea-eda3009cfa50': 'null',
      '53476ce0-b5ea-4bf3-8bea-eda3009cfa50': 'entities-testing',
      'cfcf50de-d37e-41f2-b650-829d540f2d26': 'entities-testing'
    }
  }
}
const noteID = 'NODE_ENLNwH3AecWtPfdtxbdbz'
const noteID2 = 'NODE_7VixWHC7wKFcVRFiAJDhX'
const title = 'Sample Note'
const title2 = 'Sample Note2'

const iLinks: ILink[] = [
  {
    nodeid: 'NODE_xUQJtGthbLCXkrqGDTTJX',
    path: 'This Note Is Visible',
    namespace: 'NAMESPACE_cNPFTPwyNeMKVNFrm34tH',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_pxdXdgzeeB8dmEMKFm9B8',
    path: 'Untitled',
    namespace: 'NAMESPACE_cNPFTPwyNeMKVNFrm34tH',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_qGyEkhjByN7PmriUHQAXd',
    path: 'Untitled-1',
    namespace: 'NAMESPACE_cNPFTPwyNeMKVNFrm34tH',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_EwtGbxrqBxJiigAeFxwBG',
    path: 'Untitled-2',
    namespace: 'NAMESPACE_cNPFTPwyNeMKVNFrm34tH',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_JJNckK8U6pJmqcJQdLVdB',
    path: 'Slack Notes',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_dKrFYi33pD8U3wDjAwkMA',
    path: 'Slack Notes.Fri Feb 03 2023',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_44mx73kLLhhA9RBHrNqMC',
    path: 'Nice note is here',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_8HVWMc9mR3Xhc7DHXgyr7',
    path: 'hello',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_DDbieynHPPk3wcHcbqN8V',
    path: 'NROE',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_twhC6Hz74x3jegzf6PVKU',
    path: 'NROE.Create New Note',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_jqQpJhx6GppHAh6ChWATM',
    path: 'Slack Notes.Thu Feb 02 2023',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_VGwVtY8n6n7LEDGt9iCq8',
    path: 'Slack Notes.Thu Feb 02 2023.Untitled',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_N9yVRtjd74jLVrjDxhUeT',
    path: 'Slack Notes.Thu Feb 02 2023.Untitled.Untitled',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_ANX9K9aV8ggpGBg9xDmYP',
    path: 'Slack Notes.Thu Feb 02 2023.Untitled.Untitled.Untitled',
    namespace: 'NAMESPACE_riWifgdbKFT76F3bFmCEK',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_zJQaDimUiifDTDJd4mCKD',
    path: 'Frontend - Full Time',
    namespace: 'NAMESPACE_drjtMmkCbxxnnaMJyE6Vp',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_gj6qfpBP3LNBF9YdmwGkm',
    path: 'Store - handlers',
    namespace: 'NAMESPACE_drjtMmkCbxxnnaMJyE6Vp',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_wnNwqTAgTNPe7jKQz4WEU',
    path: 'design',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_CAmgVi7fJeTHeD8jKkxiV',
    path: 'doc',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_8dchhzMAQgXV8geHRnbXk',
    path: 'Links',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_XNyGfAyLifFdhbEx4FwQ3',
    path: 'Meeting',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_UQ9irg3DmXkyhfmpzfaEn',
    path: 'Onboarding',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_JDdxNz4TFAkpgkbL4YFNk',
    path: 'Drafts',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_fP7RpK6G6NWzLqUhtfeUM',
    path: 'Drafts.Note Icons',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_ENLNwH3AecWtPfdtxbdbz',
    path: 'Daily Tasks',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_7VixWHC7wKFcVRFiAJDhX',
    path: 'Daily Tasks.Tasks',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_9FffcVxBNYnTjgDNrWUme',
    path: 'Drafts.Feb 20, 2023, 8:14:08 PM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_wfcqY8JG3EULNRcbGUCwN',
    path: 'Drafts.Feb 20, 2023, 8:14:40 PM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_J7C9xyrwEp693if7aLD99',
    path: 'Drafts.Feb 20, 2023, 10:00:03 PM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_F8UaTJiTVe3KhYPMtnRAX',
    path: 'Drafts.Feb 22, 2023, 2:12:00 PM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_cNLRPa3TGPV9mQMkhbfxy',
    path: 'Drafts.Feb 24, 2023, 1:14:08 AM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  },
  {
    nodeid: 'NODE_mp8dbbERinP6RcGkTtJXj',
    path: 'Drafts.Feb 24, 2023, 1:34:29 AM',
    namespace: 'NAMESPACE_BV47Cr3LVHMrREC8n6j48',
    icon: {
      type: 'ICON',
      value: 'gg:file-document'
    }
  }
]

export const prettyPrint = (item) => {
  console.log('RESULT', JSON.stringify(item, null, 2))
}

export const generateEntities = () => {
  const searchIdx = new SearchX()
  searchIdx.initializeHeirarchy(iLinks)
  // const parser = new EntityParser()
  // const parsed = parser.noteParser(noteID, content, title, { extra: extra })
  // const parsed2 = parser.noteParser(noteID2, newContent, title2, { extra: extra })

  // const graphX = new GraphX()
  // graphX.addEntities([...parsed.graphNodes, ...parsed2.graphNodes])
  // graphX.addLinks([...parsed2.graphLinks, ...parsed.graphLinks])
  // writeFileSync('./graph.dot', graphX.exportToDot())
  searchIdx.addOrUpdateDocument({
    id: noteID,
    contents: superBlockContent,
    title,
    options: { extra: extra }
  })
  // searchIdx.addOrUpdateDocument({
  //   id: noteID2,
  //   contents: newContent,
  //   title: title2,
  //   options: { extra: extra }
  // })
  // searchIdx.moveBlocks('NODE_89DimrxF7h6HmmDGxDM9h', 'NODE_jjtnMNJwLJ6bMaBMLApM4', ['TEMP_fcD7H'])
  prettyPrint(
    searchIdx.search({
      options: [
        {
          type: 'query',
          query: [
            // {
            //   type: 'tag',
            //   value: 'quickcapture',
            //   nextOperator: 'or'
            // }
            {
              type: 'text',
              value: 'task'
            }
          ],
          entities: ['SUPERBLOCK']
        }
        // {
        //   type: 'query',
        //   query: [
        //     {
        //       type: 'tag',
        //       value: 'TAG_code',
        //       entities: [Entities.TASK],
        //       nextOperator: 'or'
        //     },
        //     {
        //       type: 'tag',
        //       value: 'TAG_wowtag',
        //       entities: [Entities.TASK]
        //     }
        //   ],
        //   nextOperator: 'or'
        // },
        // {
        //   type: 'mention',
        //   value: 'USER_cfcf50de-d37e-41f2-b650-829d540f2d26',
        //   entities: [Entities.TASK],
        //   nextOperator: 'or'
        // },
        // {
        //   type: 'text',
        //   value: 'we',
        //   entities: [Entities.TASK]
        // }
      ]
    })
  )

  // console.log(
  //   searchIdx.newSearch([{
  //     type: 'text',
  //     value: 'we'
  //   }])
  // )

  // console.log(
  //   JSON.stringify(
  //     searchIdx.search(
  //       { text: '', entityTypes: [Entities.CONTENT_BLOCK, Entities.TASK] }
  //       // {
  //       //   heirarchy: ['NODE_jjtnMNJwLJ6bMaBMLApM4']
  //       //   //   query: { tag: ['TAG_wowtag'], mention: ['USER_cfcf50de-d37e-41f2-b650-829d540f2d2'], operator: 'and' },
  //       //   //   mention: ['USER_cfcf50de-d37e-41f2-b650-829d540f2d26'],
  //       //   //   operator: 'or'
  //       // }
  //     ),
  //     null,
  //     2
  //   )
  // )

  return 'Hello'
}
