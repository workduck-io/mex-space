import GraphX from './src/graphX'
import EntityParser from './src/parsers'
import SearchX from './src/searchX'
import { Entities } from './src/utils'

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
const noteID = 'NODE_jjtnMNJwLJ6bMaBMLApM4'
const noteID2 = 'NODE_89DimrxF7h6HmmDGxDM9h'
const title = 'Sample Note'
const title2 = 'Sample Note2'

export const generateEntities = () => {
  const parser = new EntityParser()
  const parsed = parser.noteParser(noteID, content, title, { extra: extra })
  const parsed2 = parser.noteParser(noteID2, newContent, title2, { extra: extra })

  const graphX = new GraphX()
  graphX.addEntities([...parsed.graphNodes, ...parsed2.graphNodes])
  graphX.addLinks([...parsed2.graphLinks, ...parsed.graphLinks])
  // writeFileSync('./graph.dot', graphX.exportToDot())
  const searchIdx = new SearchX()
  searchIdx.initializeSearch(parsed)
  searchIdx.addOrUpdateDocument(noteID2, newContent, title2, { extra: extra })
  searchIdx.moveBlocks('NODE_89DimrxF7h6HmmDGxDM9h', 'NODE_jjtnMNJwLJ6bMaBMLApM4', ['TEMP_fcD7H'])
  console.log(
    JSON.stringify(
      searchIdx.search(
        { text: '', entityTypes: [Entities.CONTENT_BLOCK, Entities.TASK] }
        // {
        //   heirarchy: ['NODE_jjtnMNJwLJ6bMaBMLApM4']
        //   //   query: { tag: ['TAG_wowtag'], mention: ['USER_cfcf50de-d37e-41f2-b650-829d540f2d2'], operator: 'and' },
        //   //   mention: ['USER_cfcf50de-d37e-41f2-b650-829d540f2d26'],
        //   //   operator: 'or'
        // }
      ),
      null,
      2
    )
  )

  return 'Hello'
}
