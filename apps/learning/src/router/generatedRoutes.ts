export default [
  {
    "name": "front",
    "path": "/front",
    "children": [
      {
        "name": "Preface",
        "path": "/front/Preface",
        "children": [
          {
            "name": "FrontendIsWhat",
            "path": "/front/Preface/FrontendIsWhat",
            "component": () => import('@/views/front/Preface/FrontendIsWhat.vue')
          },
          {
            "name": "LearningRoutes",
            "path": "/front/Preface/LearningRoutes",
            "component": () => import('@/views/front/Preface/LearningRoutes.vue')
          }
        ]
      },
      {
        "name": "CoreSkills",
        "path": "/front/CoreSkills",
        "children": [
          {
            "name": "FrontendBasicThreeElements",
            "path": "/front/CoreSkills/FrontendBasicThreeElements",
            "component": () => import('@/views/front/CoreSkills/FrontendBasicThreeElements.vue')
          },
          {
            "name": "HTML_CSS",
            "path": "/front/CoreSkills/HTML_CSS",
            "children": [
              {
                "name": "HTML",
                "path": "/front/CoreSkills/HTML_CSS/HTML",
                "children": [
                  {
                    "name": "HtmlInterviewKnowledgepPoints",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/HtmlInterviewKnowledgepPoints",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/HtmlInterviewKnowledgepPoints.vue')
                  },
                  {
                    "name": "WhatIsHtml",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/WhatIsHtml",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/WhatIsHtml.vue')
                  },
                  {
                    "name": "CommonUseTags",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/CommonUseTags",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/CommonUseTags.vue')
                  },
                  {
                    "name": "DOCTYPE",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/DOCTYPE",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/DOCTYPE.vue')
                  },
                  {
                    "name": "MetaAndTitle",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/MetaAndTitle",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/MetaAndTitle.vue')
                  },
                  {
                    "name": "HrefAndSrc",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/HrefAndSrc",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/HrefAndSrc.vue')
                  },
                  {
                    "name": "ImageLoad",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/ImageLoad",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/ImageLoad.vue')
                  },
                  {
                    "name": "ImageFormat",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/ImageFormat",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/ImageFormat.vue')
                  },
                  {
                    "name": "VideoFormat",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/VideoFormat",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/VideoFormat.vue')
                  },
                  {
                    "name": "Iframe",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/Iframe",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/Iframe.vue')
                  },
                  {
                    "name": "LinkTag",
                    "path": "/front/CoreSkills/HTML_CSS/HTML/LinkTag",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML/LinkTag.vue')
                  }
                ]
              },
              {
                "name": "CSS",
                "path": "/front/CoreSkills/HTML_CSS/CSS",
                "children": [
                  {
                    "name": "CssKnowledgepPoints",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CssKnowledgepPoints",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CssKnowledgepPoints.vue')
                  },
                  {
                    "name": "CSSProfile",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSProfile",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSProfile.vue')
                  },
                  {
                    "name": "CSSSelectors",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSSelectors",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSSelectors.vue')
                  },
                  {
                    "name": "CSSUnits",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSUnits",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSUnits.vue')
                  },
                  {
                    "name": "CSSPX",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSPX",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSPX.vue')
                  },
                  {
                    "name": "CSSColors",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSColors",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSColors.vue')
                  },
                  {
                    "name": "CSSBasicAttibutes",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes",
                    "children": [
                      {
                        "name": "Margin",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Margin",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Margin.vue')
                      },
                      {
                        "name": "Padding",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Padding",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Padding.vue')
                      },
                      {
                        "name": "Border",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Border",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Border.vue')
                      },
                      {
                        "name": "Font",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Font",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Font.vue')
                      },
                      {
                        "name": "Text",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Text",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Text.vue')
                      },
                      {
                        "name": "Background",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Background",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Background.vue')
                      },
                      {
                        "name": "Opacity",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Opacity",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Opacity.vue')
                      },
                      {
                        "name": "Overflow",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Overflow",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Overflow.vue')
                      },
                      {
                        "name": "ListStyle",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/ListStyle",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/ListStyle.vue')
                      },
                      {
                        "name": "Cursor",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Cursor",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Cursor.vue')
                      },
                      {
                        "name": "Outline",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Outline",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSBasicAttibutes/Outline.vue')
                      }
                    ]
                  },
                  {
                    "name": "CSSLayout",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout",
                    "children": [
                      {
                        "name": "BFC_IFC",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/BFC_IFC",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/BFC_IFC.vue')
                      },
                      {
                        "name": "DisplayProperty",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/DisplayProperty",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/DisplayProperty.vue')
                      },
                      {
                        "name": "CSSBoxModel",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSBoxModel",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSBoxModel.vue')
                      },
                      {
                        "name": "CSSPositioning",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSPositioning",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSPositioning.vue')
                      },
                      {
                        "name": "CSSFloat",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSFloat",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSFloat.vue')
                      },
                      {
                        "name": "CSSZIndex",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSZIndex",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSZIndex.vue')
                      },
                      {
                        "name": "CSSCenter",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSCenter",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/CSSCenter.vue')
                      },
                      {
                        "name": "TwoColumnAndThreeColumnLayout",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSLayout/TwoColumnAndThreeColumnLayout",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSLayout/TwoColumnAndThreeColumnLayout.vue')
                      }
                    ]
                  },
                  {
                    "name": "CSSHideElements",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSHideElements",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSHideElements.vue')
                  },
                  {
                    "name": "CSSAtRules",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSAtRules",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSAtRules.vue')
                  },
                  {
                    "name": "CSSPreprocessors",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSPreprocessors",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSPreprocessors.vue')
                  },
                  {
                    "name": "CSSNaming",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSNaming",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSNaming.vue')
                  },
                  {
                    "name": "CSSPerformance",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSPerformance",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSPerformance.vue')
                  },
                  {
                    "name": "CSSTools",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSTools",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSTools.vue')
                  },
                  {
                    "name": "CSSAnimationLibrary",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSAnimationLibrary",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSAnimationLibrary.vue')
                  },
                  {
                    "name": "CSSAtomic",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/CSSAtomic",
                    "children": [
                      {
                        "name": "CSSAtomicIntroduce",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSAtomic/CSSAtomicIntroduce",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSAtomic/CSSAtomicIntroduce.vue')
                      },
                      {
                        "name": "TailwindCSS",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/CSSAtomic/TailwindCSS",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/CSSAtomic/TailwindCSS.vue')
                      }
                    ]
                  },
                  {
                    "name": "PureCSSEffects",
                    "path": "/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects",
                    "children": [
                      {
                        "name": "BasicImplementation",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/BasicImplementation",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/BasicImplementation.vue')
                      },
                      {
                        "name": "LoadingEffect",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/LoadingEffect",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/LoadingEffect.vue')
                      },
                      {
                        "name": "Wave",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/Wave",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/Wave.vue')
                      },
                      {
                        "name": "ParallaxScrolling",
                        "path": "/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/ParallaxScrolling",
                        "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS/PureCSSEffects/ParallaxScrolling.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "CSS3",
                "path": "/front/CoreSkills/HTML_CSS/CSS3",
                "children": [
                  {
                    "name": "Css3InterviewKnowledgepPoints",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Css3InterviewKnowledgepPoints",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Css3InterviewKnowledgepPoints.vue')
                  },
                  {
                    "name": "Flexbox",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Flexbox",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Flexbox.vue')
                  },
                  {
                    "name": "Grid",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Grid",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Grid.vue')
                  },
                  {
                    "name": "MultiColumnLayout",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/MultiColumnLayout",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/MultiColumnLayout.vue')
                  },
                  {
                    "name": "MediaQueries",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/MediaQueries",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/MediaQueries.vue')
                  },
                  {
                    "name": "ContainerQueries",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ContainerQueries",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ContainerQueries.vue')
                  },
                  {
                    "name": "AspectRatio",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/AspectRatio",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/AspectRatio.vue')
                  },
                  {
                    "name": "ObjectFit",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ObjectFit",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ObjectFit.vue')
                  },
                  {
                    "name": "Shapes",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Shapes",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Shapes.vue')
                  },
                  {
                    "name": "CSSFunctions",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/CSSFunctions",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/CSSFunctions.vue')
                  },
                  {
                    "name": "Transition",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Transition",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Transition.vue')
                  },
                  {
                    "name": "Animation",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Animation",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Animation.vue')
                  },
                  {
                    "name": "Transform",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Transform",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Transform.vue')
                  },
                  {
                    "name": "Gradient",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Gradient",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Gradient.vue')
                  },
                  {
                    "name": "RepeatingGradient",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/RepeatingGradient",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/RepeatingGradient.vue')
                  },
                  {
                    "name": "Filter",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Filter",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Filter.vue')
                  },
                  {
                    "name": "BoxShadow",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/BoxShadow",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/BoxShadow.vue')
                  },
                  {
                    "name": "BorderRadius",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/BorderRadius",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/BorderRadius.vue')
                  },
                  {
                    "name": "BordersImage",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/BordersImage",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/BordersImage.vue')
                  },
                  {
                    "name": "ClipPath",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ClipPath",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ClipPath.vue')
                  },
                  {
                    "name": "MaskImage",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/MaskImage",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/MaskImage.vue')
                  },
                  {
                    "name": "BlendModes",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/BlendModes",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/BlendModes.vue')
                  },
                  {
                    "name": "ScrollSnap",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ScrollSnap",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ScrollSnap.vue')
                  },
                  {
                    "name": "Contain",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/Contain",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/Contain.vue')
                  },
                  {
                    "name": "ContentVisibility",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ContentVisibility",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ContentVisibility.vue')
                  },
                  {
                    "name": "WillChange",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/WillChange",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/WillChange.vue')
                  },
                  {
                    "name": "AnimateMotion",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/AnimateMotion",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/AnimateMotion.vue')
                  },
                  {
                    "name": "ScrollLinkedAnimations",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/ScrollLinkedAnimations",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/ScrollLinkedAnimations.vue')
                  },
                  {
                    "name": "CustomProperty",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/CustomProperty",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/CustomProperty.vue')
                  },
                  {
                    "name": "RelativeColorScheme",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/RelativeColorScheme",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/RelativeColorScheme.vue')
                  },
                  {
                    "name": "CSSNesting",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/CSSNesting",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/CSSNesting.vue')
                  },
                  {
                    "name": "CSS3OtherAttributes",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/CSS3OtherAttributes",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/CSS3OtherAttributes.vue')
                  },
                  {
                    "name": "CSS3Overview",
                    "path": "/front/CoreSkills/HTML_CSS/CSS3/CSS3Overview",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/CSS3/CSS3Overview.vue')
                  }
                ]
              },
              {
                "name": "HTML5",
                "path": "/front/CoreSkills/HTML_CSS/HTML5",
                "children": [
                  {
                    "name": "Html5InterviewKnowledgepPoints",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/Html5InterviewKnowledgepPoints",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/Html5InterviewKnowledgepPoints.vue')
                  },
                  {
                    "name": "SemanticTags",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/SemanticTags",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/SemanticTags.vue')
                  },
                  {
                    "name": "FormElements",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/FormElements",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/FormElements.vue')
                  },
                  {
                    "name": "Canvas",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/Canvas",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/Canvas.vue')
                  },
                  {
                    "name": "SVG",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/SVG",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/SVG.vue')
                  },
                  {
                    "name": "AudioVideo",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/AudioVideo",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/AudioVideo.vue')
                  },
                  {
                    "name": "Geolocation",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/Geolocation",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/Geolocation.vue')
                  },
                  {
                    "name": "DragDrop",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/DragDrop",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/DragDrop.vue')
                  },
                  {
                    "name": "WebWorker",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebWorker",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebWorker.vue')
                  },
                  {
                    "name": "SharedWorker",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/SharedWorker",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/SharedWorker.vue')
                  },
                  {
                    "name": "BroadcastChannel",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/BroadcastChannel",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/BroadcastChannel.vue')
                  },
                  {
                    "name": "WebStorage",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebStorage",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebStorage.vue')
                  },
                  {
                    "name": "IndexDB",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/IndexDB",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/IndexDB.vue')
                  },
                  {
                    "name": "WebSocket",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebSocket",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebSocket.vue')
                  },
                  {
                    "name": "LazyLoad",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/LazyLoad",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/LazyLoad.vue')
                  },
                  {
                    "name": "SEO",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/SEO",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/SEO.vue')
                  },
                  {
                    "name": "MobileAdaptation",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/MobileAdaptation",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/MobileAdaptation.vue')
                  },
                  {
                    "name": "PictureInPicture",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/PictureInPicture",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/PictureInPicture.vue')
                  },
                  {
                    "name": "FileAPI",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/FileAPI",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/FileAPI.vue')
                  },
                  {
                    "name": "EyeDropper",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/EyeDropper",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/EyeDropper.vue')
                  },
                  {
                    "name": "WebBluetooth",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebBluetooth",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebBluetooth.vue')
                  },
                  {
                    "name": "WebNFC",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebNFC",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebNFC.vue')
                  },
                  {
                    "name": "WebCryptoAPIs",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebCryptoAPIs",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebCryptoAPIs.vue')
                  },
                  {
                    "name": "WebAuthn",
                    "path": "/front/CoreSkills/HTML_CSS/HTML5/WebAuthn",
                    "component": () => import('@/views/front/CoreSkills/HTML_CSS/HTML5/WebAuthn.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "JavaScript",
            "path": "/front/CoreSkills/JavaScript",
            "children": [
              {
                "name": "Basics",
                "path": "/front/CoreSkills/JavaScript/Basics",
                "children": [
                  {
                    "name": "WhatIsJS",
                    "path": "/front/CoreSkills/JavaScript/Basics/WhatIsJS",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/WhatIsJS.vue')
                  },
                  {
                    "name": "JSLoad",
                    "path": "/front/CoreSkills/JavaScript/Basics/JSLoad",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/JSLoad.vue')
                  },
                  {
                    "name": "Variables",
                    "path": "/front/CoreSkills/JavaScript/Basics/Variables",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Variables.vue')
                  },
                  {
                    "name": "DataTypes",
                    "path": "/front/CoreSkills/JavaScript/Basics/DataTypes",
                    "children": [
                      {
                        "name": "PrimitiveTypes",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/PrimitiveTypes",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/PrimitiveTypes.vue')
                      },
                      {
                        "name": "FloatingPointPrecisionAndSolution",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/FloatingPointPrecisionAndSolution",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/FloatingPointPrecisionAndSolution.vue')
                      },
                      {
                        "name": "ReferenceTypes",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes",
                        "children": [
                          {
                            "name": "ReferenceTypesIntroduce",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/ReferenceTypesIntroduce",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/ReferenceTypesIntroduce.vue')
                          },
                          {
                            "name": "Object1",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Object1",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Object1.vue')
                          },
                          {
                            "name": "CreateObject",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/CreateObject",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/CreateObject.vue')
                          },
                          {
                            "name": "FaceObjectProgramming",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/FaceObjectProgramming",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/FaceObjectProgramming.vue')
                          },
                          {
                            "name": "ObjectDescriptor",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/ObjectDescriptor",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/ObjectDescriptor.vue')
                          },
                          {
                            "name": "Array1",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Array1",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Array1.vue')
                          },
                          {
                            "name": "Function",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Function",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Function.vue')
                          },
                          {
                            "name": "Date1",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Date1",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/Date1.vue')
                          },
                          {
                            "name": "RegExp1",
                            "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/RegExp1",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/ReferenceTypes/RegExp1.vue')
                          }
                        ]
                      },
                      {
                        "name": "DeepCopyShallowCopy",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/DeepCopyShallowCopy",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/DeepCopyShallowCopy.vue')
                      },
                      {
                        "name": "SpecialDataTypes",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/SpecialDataTypes",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/SpecialDataTypes.vue')
                      },
                      {
                        "name": "TypeChecking",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/TypeChecking",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/TypeChecking.vue')
                      },
                      {
                        "name": "TypeConversion",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/TypeConversion",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/TypeConversion.vue')
                      },
                      {
                        "name": "TypeComparison",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/TypeComparison",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/TypeComparison.vue')
                      },
                      {
                        "name": "TypeDetection",
                        "path": "/front/CoreSkills/JavaScript/Basics/DataTypes/TypeDetection",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DataTypes/TypeDetection.vue')
                      }
                    ]
                  },
                  {
                    "name": "Operators",
                    "path": "/front/CoreSkills/JavaScript/Basics/Operators",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Operators.vue')
                  },
                  {
                    "name": "OperatorPriorityAndAdvancedUsage",
                    "path": "/front/CoreSkills/JavaScript/Basics/OperatorPriorityAndAdvancedUsage",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/OperatorPriorityAndAdvancedUsage.vue')
                  },
                  {
                    "name": "BitwiseOperators",
                    "path": "/front/CoreSkills/JavaScript/Basics/BitwiseOperators",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/BitwiseOperators.vue')
                  },
                  {
                    "name": "FlowControl",
                    "path": "/front/CoreSkills/JavaScript/Basics/FlowControl",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FlowControl.vue')
                  },
                  {
                    "name": "Iteration",
                    "path": "/front/CoreSkills/JavaScript/Basics/Iteration",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Iteration.vue')
                  },
                  {
                    "name": "IteratorAndProtocol",
                    "path": "/front/CoreSkills/JavaScript/Basics/IteratorAndProtocol",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/IteratorAndProtocol.vue')
                  },
                  {
                    "name": "GeneratorAndCoroutine",
                    "path": "/front/CoreSkills/JavaScript/Basics/GeneratorAndCoroutine",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/GeneratorAndCoroutine.vue')
                  },
                  {
                    "name": "FunctionProgramming",
                    "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming",
                    "children": [
                      {
                        "name": "FunctionProgrammingIntroduce",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctionProgrammingIntroduce",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctionProgrammingIntroduce.vue')
                      },
                      {
                        "name": "Functions",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/Functions",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/Functions.vue')
                      },
                      {
                        "name": "DefaultAndRestParameters",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/DefaultAndRestParameters",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/DefaultAndRestParameters.vue')
                      },
                      {
                        "name": "PureFunction",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/PureFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/PureFunction.vue')
                      },
                      {
                        "name": "Currying",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/Currying",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/Currying.vue')
                      },
                      {
                        "name": "FunctionComposition",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctionComposition",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctionComposition.vue')
                      },
                      {
                        "name": "HigherOrderFunction",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/HigherOrderFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/HigherOrderFunction.vue')
                      },
                      {
                        "name": "CallbackFunction",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/CallbackFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/CallbackFunction.vue')
                      },
                      {
                        "name": "FunctorAndMonad",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctorAndMonad",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/FunctorAndMonad.vue')
                      },
                      {
                        "name": "RecursionFunction",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/RecursionFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/RecursionFunction.vue')
                      },
                      {
                        "name": "TailRecursion",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/TailRecursion",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/TailRecursion.vue')
                      },
                      {
                        "name": "BounceFunction",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/BounceFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/BounceFunction.vue')
                      },
                      {
                        "name": "EvalAndWith",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/EvalAndWith",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/EvalAndWith.vue')
                      },
                      {
                        "name": "ExecuteCodeString",
                        "path": "/front/CoreSkills/JavaScript/Basics/FunctionProgramming/ExecuteCodeString",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/FunctionProgramming/ExecuteCodeString.vue')
                      }
                    ]
                  },
                  {
                    "name": "ExecutionContext",
                    "path": "/front/CoreSkills/JavaScript/Basics/ExecutionContext",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/ExecutionContext.vue')
                  },
                  {
                    "name": "ThisBinding",
                    "path": "/front/CoreSkills/JavaScript/Basics/ThisBinding",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/ThisBinding.vue')
                  },
                  {
                    "name": "Scope",
                    "path": "/front/CoreSkills/JavaScript/Basics/Scope",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Scope.vue')
                  },
                  {
                    "name": "Closure",
                    "path": "/front/CoreSkills/JavaScript/Basics/Closure",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Closure.vue')
                  },
                  {
                    "name": "PrototypeProgramming",
                    "path": "/front/CoreSkills/JavaScript/Basics/PrototypeProgramming",
                    "children": [
                      {
                        "name": "Prototype1",
                        "path": "/front/CoreSkills/JavaScript/Basics/PrototypeProgramming/Prototype1",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/PrototypeProgramming/Prototype1.vue')
                      },
                      {
                        "name": "PrototypePollution",
                        "path": "/front/CoreSkills/JavaScript/Basics/PrototypeProgramming/PrototypePollution",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/PrototypeProgramming/PrototypePollution.vue')
                      }
                    ]
                  },
                  {
                    "name": "BOM",
                    "path": "/front/CoreSkills/JavaScript/Basics/BOM",
                    "children": [
                      {
                        "name": "WindowNavigatorScreenCommonMethodsAndAttributes",
                        "path": "/front/CoreSkills/JavaScript/Basics/BOM/WindowNavigatorScreenCommonMethodsAndAttributes",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/BOM/WindowNavigatorScreenCommonMethodsAndAttributes.vue')
                      },
                      {
                        "name": "WindowCommonMethodsAndAttributes",
                        "path": "/front/CoreSkills/JavaScript/Basics/BOM/WindowCommonMethodsAndAttributes",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/BOM/WindowCommonMethodsAndAttributes.vue')
                      },
                      {
                        "name": "WindowClassInterface",
                        "path": "/front/CoreSkills/JavaScript/Basics/BOM/WindowClassInterface",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/BOM/WindowClassInterface.vue')
                      },
                      {
                        "name": "GetDeviceInformation",
                        "path": "/front/CoreSkills/JavaScript/Basics/BOM/GetDeviceInformation",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/BOM/GetDeviceInformation.vue')
                      }
                    ]
                  },
                  {
                    "name": "DOM",
                    "path": "/front/CoreSkills/JavaScript/Basics/DOM",
                    "children": [
                      {
                        "name": "DOMAddDeleteModifyQuery",
                        "path": "/front/CoreSkills/JavaScript/Basics/DOM/DOMAddDeleteModifyQuery",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DOM/DOMAddDeleteModifyQuery.vue')
                      },
                      {
                        "name": "ElementPositionAndSize",
                        "path": "/front/CoreSkills/JavaScript/Basics/DOM/ElementPositionAndSize",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DOM/ElementPositionAndSize.vue')
                      },
                      {
                        "name": "ElementCommonMethods",
                        "path": "/front/CoreSkills/JavaScript/Basics/DOM/ElementCommonMethods",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/DOM/ElementCommonMethods.vue')
                      }
                    ]
                  },
                  {
                    "name": "Events",
                    "path": "/front/CoreSkills/JavaScript/Basics/Events",
                    "children": [
                      {
                        "name": "EventsIntroduce",
                        "path": "/front/CoreSkills/JavaScript/Basics/Events/EventsIntroduce",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/EventsIntroduce.vue')
                      },
                      {
                        "name": "LoadEvent",
                        "path": "/front/CoreSkills/JavaScript/Basics/Events/LoadEvent",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/LoadEvent.vue')
                      },
                      {
                        "name": "CommonEvents",
                        "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents",
                        "children": [
                          {
                            "name": "CommonEventsList",
                            "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/CommonEventsList",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/CommonEventsList.vue')
                          },
                          {
                            "name": "ScrollEvent",
                            "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/ScrollEvent",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/ScrollEvent.vue')
                          },
                          {
                            "name": "ResizeEvent",
                            "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/ResizeEvent",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/ResizeEvent.vue')
                          },
                          {
                            "name": "MouseMoveEvent",
                            "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/MouseMoveEvent",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/MouseMoveEvent.vue')
                          },
                          {
                            "name": "TouchEvent",
                            "path": "/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/TouchEvent",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CommonEvents/TouchEvent.vue')
                          }
                        ]
                      },
                      {
                        "name": "CustomEvent",
                        "path": "/front/CoreSkills/JavaScript/Basics/Events/CustomEvent",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/Events/CustomEvent.vue')
                      }
                    ]
                  },
                  {
                    "name": "AsyncProgramming",
                    "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming",
                    "children": [
                      {
                        "name": "AsyncProgrammingIntroduce",
                        "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming/AsyncProgrammingIntroduce",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/AsyncProgramming/AsyncProgrammingIntroduce.vue')
                      },
                      {
                        "name": "MacroTask",
                        "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming/MacroTask",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/AsyncProgramming/MacroTask.vue')
                      },
                      {
                        "name": "Timer",
                        "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming/Timer",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/AsyncProgramming/Timer.vue')
                      },
                      {
                        "name": "MicroTask",
                        "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming/MicroTask",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/AsyncProgramming/MicroTask.vue')
                      },
                      {
                        "name": "QueueMicrotask",
                        "path": "/front/CoreSkills/JavaScript/Basics/AsyncProgramming/QueueMicrotask",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/AsyncProgramming/QueueMicrotask.vue')
                      }
                    ]
                  },
                  {
                    "name": "JSPAndCAndE",
                    "path": "/front/CoreSkills/JavaScript/Basics/JSPAndCAndE",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/JSPAndCAndE.vue')
                  },
                  {
                    "name": "ErrorHandling",
                    "path": "/front/CoreSkills/JavaScript/Basics/ErrorHandling",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/ErrorHandling.vue')
                  },
                  {
                    "name": "UseStrict",
                    "path": "/front/CoreSkills/JavaScript/Basics/UseStrict",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/UseStrict.vue')
                  },
                  {
                    "name": "ReservedKeywords",
                    "path": "/front/CoreSkills/JavaScript/Basics/ReservedKeywords",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/ReservedKeywords.vue')
                  },
                  {
                    "name": "NativeJSKnowledgePoints",
                    "path": "/front/CoreSkills/JavaScript/Basics/NativeJSKnowledgePoints",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Basics/NativeJSKnowledgePoints.vue')
                  }
                ]
              },
              {
                "name": "ES",
                "path": "/front/CoreSkills/JavaScript/ES",
                "children": [
                  {
                    "name": "ES+Overview",
                    "path": "/front/CoreSkills/JavaScript/ES/ES+Overview",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/ES+Overview.vue')
                  },
                  {
                    "name": "LetConst",
                    "path": "/front/CoreSkills/JavaScript/ES/LetConst",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/LetConst.vue')
                  },
                  {
                    "name": "SpreadOperator",
                    "path": "/front/CoreSkills/JavaScript/ES/SpreadOperator",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/SpreadOperator.vue')
                  },
                  {
                    "name": "Destructuring",
                    "path": "/front/CoreSkills/JavaScript/ES/Destructuring",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Destructuring.vue')
                  },
                  {
                    "name": "ArrowFunction",
                    "path": "/front/CoreSkills/JavaScript/ES/ArrowFunction",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/ArrowFunction.vue')
                  },
                  {
                    "name": "StrictMode",
                    "path": "/front/CoreSkills/JavaScript/ES/StrictMode",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/StrictMode.vue')
                  },
                  {
                    "name": "GlobalThis",
                    "path": "/front/CoreSkills/JavaScript/ES/GlobalThis",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/GlobalThis.vue')
                  },
                  {
                    "name": "Array",
                    "path": "/front/CoreSkills/JavaScript/ES/Array",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Array.vue')
                  },
                  {
                    "name": "Object2",
                    "path": "/front/CoreSkills/JavaScript/ES/Object2",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Object2.vue')
                  },
                  {
                    "name": "ObjectOtherKnowledge",
                    "path": "/front/CoreSkills/JavaScript/ES/ObjectOtherKnowledge",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/ObjectOtherKnowledge.vue')
                  },
                  {
                    "name": "String",
                    "path": "/front/CoreSkills/JavaScript/ES/String",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/String.vue')
                  },
                  {
                    "name": "TemplateString",
                    "path": "/front/CoreSkills/JavaScript/ES/TemplateString",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/TemplateString.vue')
                  },
                  {
                    "name": "RegExp",
                    "path": "/front/CoreSkills/JavaScript/ES/RegExp",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/RegExp.vue')
                  },
                  {
                    "name": "StringMatchAllAndReplaceAll",
                    "path": "/front/CoreSkills/JavaScript/ES/StringMatchAllAndReplaceAll",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/StringMatchAllAndReplaceAll.vue')
                  },
                  {
                    "name": "JSON",
                    "path": "/front/CoreSkills/JavaScript/ES/JSON",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/JSON.vue')
                  },
                  {
                    "name": "Number",
                    "path": "/front/CoreSkills/JavaScript/ES/Number",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Number.vue')
                  },
                  {
                    "name": "NumericSeparators",
                    "path": "/front/CoreSkills/JavaScript/ES/NumericSeparators",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/NumericSeparators.vue')
                  },
                  {
                    "name": "BigInt",
                    "path": "/front/CoreSkills/JavaScript/ES/BigInt",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/BigInt.vue')
                  },
                  {
                    "name": "Math",
                    "path": "/front/CoreSkills/JavaScript/ES/Math",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Math.vue')
                  },
                  {
                    "name": "Date",
                    "path": "/front/CoreSkills/JavaScript/ES/Date",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Date.vue')
                  },
                  {
                    "name": "Class",
                    "path": "/front/CoreSkills/JavaScript/ES/Class",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Class.vue')
                  },
                  {
                    "name": "PrivateClassFields",
                    "path": "/front/CoreSkills/JavaScript/ES/PrivateClassFields",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/PrivateClassFields.vue')
                  },
                  {
                    "name": "Symbol",
                    "path": "/front/CoreSkills/JavaScript/ES/Symbol",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Symbol.vue')
                  },
                  {
                    "name": "Proxy2",
                    "path": "/front/CoreSkills/JavaScript/ES/Proxy2",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Proxy2.vue')
                  },
                  {
                    "name": "Reflect",
                    "path": "/front/CoreSkills/JavaScript/ES/Reflect",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Reflect.vue')
                  },
                  {
                    "name": "SetMap",
                    "path": "/front/CoreSkills/JavaScript/ES/SetMap",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/SetMap.vue')
                  },
                  {
                    "name": "SetMapObjectPerformanceComparison",
                    "path": "/front/CoreSkills/JavaScript/ES/SetMapObjectPerformanceComparison",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/SetMapObjectPerformanceComparison.vue')
                  },
                  {
                    "name": "WeakRef",
                    "path": "/front/CoreSkills/JavaScript/ES/WeakRef",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/WeakRef.vue')
                  },
                  {
                    "name": "Promise",
                    "path": "/front/CoreSkills/JavaScript/ES/Promise",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Promise.vue')
                  },
                  {
                    "name": "PromiseAdvanced",
                    "path": "/front/CoreSkills/JavaScript/ES/PromiseAdvanced",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/PromiseAdvanced.vue')
                  },
                  {
                    "name": "PromiseImplementationScenarios",
                    "path": "/front/CoreSkills/JavaScript/ES/PromiseImplementationScenarios",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/PromiseImplementationScenarios.vue')
                  },
                  {
                    "name": "Generator",
                    "path": "/front/CoreSkills/JavaScript/ES/Generator",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Generator.vue')
                  },
                  {
                    "name": "CoroutineAndYield",
                    "path": "/front/CoreSkills/JavaScript/ES/CoroutineAndYield",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/CoroutineAndYield.vue')
                  },
                  {
                    "name": "Iterator1",
                    "path": "/front/CoreSkills/JavaScript/ES/Iterator1",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Iterator1.vue')
                  },
                  {
                    "name": "AsyncIterator",
                    "path": "/front/CoreSkills/JavaScript/ES/AsyncIterator",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/AsyncIterator.vue')
                  },
                  {
                    "name": "AsyncAwait",
                    "path": "/front/CoreSkills/JavaScript/ES/AsyncAwait",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/AsyncAwait.vue')
                  },
                  {
                    "name": "TopLevelAwait",
                    "path": "/front/CoreSkills/JavaScript/ES/TopLevelAwait",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/TopLevelAwait.vue')
                  },
                  {
                    "name": "Modules",
                    "path": "/front/CoreSkills/JavaScript/ES/Modules",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Modules.vue')
                  },
                  {
                    "name": "DynamicImport",
                    "path": "/front/CoreSkills/JavaScript/ES/DynamicImport",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/DynamicImport.vue')
                  },
                  {
                    "name": "ImportAttributes",
                    "path": "/front/CoreSkills/JavaScript/ES/ImportAttributes",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/ImportAttributes.vue')
                  },
                  {
                    "name": "BinaryArray",
                    "path": "/front/CoreSkills/JavaScript/ES/BinaryArray",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/BinaryArray.vue')
                  },
                  {
                    "name": "Atomics",
                    "path": "/front/CoreSkills/JavaScript/ES/Atomics",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Atomics.vue')
                  },
                  {
                    "name": "OptionalCatch",
                    "path": "/front/CoreSkills/JavaScript/ES/OptionalCatch",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/OptionalCatch.vue')
                  },
                  {
                    "name": "OptionalChaining",
                    "path": "/front/CoreSkills/JavaScript/ES/OptionalChaining",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/OptionalChaining.vue')
                  },
                  {
                    "name": "NullishCoalescing",
                    "path": "/front/CoreSkills/JavaScript/ES/NullishCoalescing",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/NullishCoalescing.vue')
                  },
                  {
                    "name": "LogicalAssignment",
                    "path": "/front/CoreSkills/JavaScript/ES/LogicalAssignment",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/LogicalAssignment.vue')
                  },
                  {
                    "name": "Hashbang",
                    "path": "/front/CoreSkills/JavaScript/ES/Hashbang",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Hashbang.vue')
                  },
                  {
                    "name": "Decorator1",
                    "path": "/front/CoreSkills/JavaScript/ES/Decorator1",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Decorator1.vue')
                  },
                  {
                    "name": "Temporal",
                    "path": "/front/CoreSkills/JavaScript/ES/Temporal",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/Temporal.vue')
                  },
                  {
                    "name": "RecordAndTuple",
                    "path": "/front/CoreSkills/JavaScript/ES/RecordAndTuple",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/RecordAndTuple.vue')
                  },
                  {
                    "name": "PipelineOperator",
                    "path": "/front/CoreSkills/JavaScript/ES/PipelineOperator",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/PipelineOperator.vue')
                  },
                  {
                    "name": "ESKnowledgepPoints",
                    "path": "/front/CoreSkills/JavaScript/ES/ESKnowledgepPoints",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/ES/ESKnowledgepPoints.vue')
                  }
                ]
              },
              {
                "name": "JSSmallTips",
                "path": "/front/CoreSkills/JavaScript/JSSmallTips",
                "component": () => import('@/views/front/CoreSkills/JavaScript/JSSmallTips.vue')
              },
              {
                "name": "JSTips",
                "path": "/front/CoreSkills/JavaScript/JSTips",
                "children": [
                  {
                    "name": "RequestAnimationFrame",
                    "path": "/front/CoreSkills/JavaScript/JSTips/RequestAnimationFrame",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/RequestAnimationFrame.vue')
                  },
                  {
                    "name": "RequestIdleCallbackTimeSlice",
                    "path": "/front/CoreSkills/JavaScript/JSTips/RequestIdleCallbackTimeSlice",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/RequestIdleCallbackTimeSlice.vue')
                  },
                  {
                    "name": "PerformanceTuning",
                    "path": "/front/CoreSkills/JavaScript/JSTips/PerformanceTuning",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/PerformanceTuning.vue')
                  },
                  {
                    "name": "IntersectionObserverApi",
                    "path": "/front/CoreSkills/JavaScript/JSTips/IntersectionObserverApi",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/IntersectionObserverApi.vue')
                  },
                  {
                    "name": "MutationObserverApi",
                    "path": "/front/CoreSkills/JavaScript/JSTips/MutationObserverApi",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/MutationObserverApi.vue')
                  },
                  {
                    "name": "ResizeObserverApi",
                    "path": "/front/CoreSkills/JavaScript/JSTips/ResizeObserverApi",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/JSTips/ResizeObserverApi.vue')
                  }
                ]
              },
              {
                "name": "GarbageCollection",
                "path": "/front/CoreSkills/JavaScript/GarbageCollection",
                "children": [
                  {
                    "name": "GarbageCollectionAlgorithm",
                    "path": "/front/CoreSkills/JavaScript/GarbageCollection/GarbageCollectionAlgorithm",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/GarbageCollection/GarbageCollectionAlgorithm.vue')
                  },
                  {
                    "name": "MemoryLeak",
                    "path": "/front/CoreSkills/JavaScript/GarbageCollection/MemoryLeak",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/GarbageCollection/MemoryLeak.vue')
                  },
                  {
                    "name": "MemoryManagement1",
                    "path": "/front/CoreSkills/JavaScript/GarbageCollection/MemoryManagement1",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/GarbageCollection/MemoryManagement1.vue')
                  }
                ]
              },
              {
                "name": "Modularization",
                "path": "/front/CoreSkills/JavaScript/Modularization",
                "children": [
                  {
                    "name": "ModularizationOverview",
                    "path": "/front/CoreSkills/JavaScript/Modularization/ModularizationOverview",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/ModularizationOverview.vue')
                  },
                  {
                    "name": "ESModule",
                    "path": "/front/CoreSkills/JavaScript/Modularization/ESModule",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/ESModule.vue')
                  },
                  {
                    "name": "ESModuleLoadingPrinciple",
                    "path": "/front/CoreSkills/JavaScript/Modularization/ESModuleLoadingPrinciple",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/ESModuleLoadingPrinciple.vue')
                  },
                  {
                    "name": "CommonJS",
                    "path": "/front/CoreSkills/JavaScript/Modularization/CommonJS",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/CommonJS.vue')
                  },
                  {
                    "name": "ModuleLoadingReferenceType",
                    "path": "/front/CoreSkills/JavaScript/Modularization/ModuleLoadingReferenceType",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/ModuleLoadingReferenceType.vue')
                  },
                  {
                    "name": "AMD-CMD",
                    "path": "/front/CoreSkills/JavaScript/Modularization/AMD-CMD",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/AMD-CMD.vue')
                  },
                  {
                    "name": "UMD",
                    "path": "/front/CoreSkills/JavaScript/Modularization/UMD",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/UMD.vue')
                  },
                  {
                    "name": "bundleless",
                    "path": "/front/CoreSkills/JavaScript/Modularization/bundleless",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/Modularization/bundleless.vue')
                  }
                ]
              },
              {
                "name": "FrontendDataStreamFormat",
                "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat",
                "children": [
                  {
                    "name": "DataStreamFormatOverview",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/DataStreamFormatOverview",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/DataStreamFormatOverview.vue')
                  },
                  {
                    "name": "Blob",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/Blob",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/Blob.vue')
                  },
                  {
                    "name": "File",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/File",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/File.vue')
                  },
                  {
                    "name": "DataURL",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/DataURL",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/DataURL.vue')
                  },
                  {
                    "name": "CanvasDataFormat",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/CanvasDataFormat",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/CanvasDataFormat.vue')
                  },
                  {
                    "name": "ArrayBufferDataFormat",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/ArrayBufferDataFormat",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/ArrayBufferDataFormat.vue')
                  },
                  {
                    "name": "FileReader",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/FileReader",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/FileReader.vue')
                  },
                  {
                    "name": "ReadableStreamAndWritableStream",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/ReadableStreamAndWritableStream",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/ReadableStreamAndWritableStream.vue')
                  },
                  {
                    "name": "OtherFileProcessingInterface",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/OtherFileProcessingInterface",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/OtherFileProcessingInterface.vue')
                  },
                  {
                    "name": "MIMEType",
                    "path": "/front/CoreSkills/JavaScript/FrontendDataStreamFormat/MIMEType",
                    "component": () => import('@/views/front/CoreSkills/JavaScript/FrontendDataStreamFormat/MIMEType.vue')
                  }
                ]
              },
              {
                "name": "HandwrittenCode",
                "path": "/front/CoreSkills/JavaScript/HandwrittenCode",
                "children": [
                  {
                    "name": "NativeMethodsImplementation",
                    "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation",
                    "children": [
                      {
                        "name": "NativeMethodsList",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/NativeMethodsList",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/NativeMethodsList.vue')
                      },
                      {
                        "name": "DeepCopy",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/DeepCopy",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/DeepCopy.vue')
                      },
                      {
                        "name": "AchieveNew",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveNew",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveNew.vue')
                      },
                      {
                        "name": "AchieveArrowFunction",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveArrowFunction",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveArrowFunction.vue')
                      },
                      {
                        "name": "AchieveInstanceof",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveInstanceof",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveInstanceof.vue')
                      },
                      {
                        "name": "AchieveStringMethods",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveStringMethods",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveStringMethods.vue')
                      },
                      {
                        "name": "AchieveArrayMethods",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveArrayMethods",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveArrayMethods.vue')
                      },
                      {
                        "name": "AchieveObjectMethods",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveObjectMethods",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/AchieveObjectMethods.vue')
                      },
                      {
                        "name": "CallAndApplyAndBind",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/CallAndApplyAndBind",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/CallAndApplyAndBind.vue')
                      },
                      {
                        "name": "TemplateStringImplementation",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/TemplateStringImplementation",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/TemplateStringImplementation.vue')
                      },
                      {
                        "name": "JSONStringifyAndParse",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/JSONStringifyAndParse",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/JSONStringifyAndParse.vue')
                      },
                      {
                        "name": "PromiseCorrelation",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/PromiseCorrelation",
                        "children": [
                          {
                            "name": "PromiseImplementation",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/PromiseCorrelation/PromiseImplementation",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/PromiseCorrelation/PromiseImplementation.vue')
                          },
                          {
                            "name": "PromiseScenarios",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/PromiseCorrelation/PromiseScenarios",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/NativeMethodsImplementation/PromiseCorrelation/PromiseScenarios.vue')
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "DesignPatternImplementation",
                    "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation",
                    "children": [
                      {
                        "name": "SingletonPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/SingletonPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/SingletonPattern.vue')
                      },
                      {
                        "name": "ObserverPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ObserverPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ObserverPattern.vue')
                      },
                      {
                        "name": "PublishSubscribeImplementation",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/PublishSubscribeImplementation",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/PublishSubscribeImplementation.vue')
                      },
                      {
                        "name": "FactoryPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/FactoryPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/FactoryPattern.vue')
                      },
                      {
                        "name": "StrategyPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/StrategyPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/StrategyPattern.vue')
                      },
                      {
                        "name": "StatePattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/StatePattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/StatePattern.vue')
                      },
                      {
                        "name": "ProxyPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ProxyPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ProxyPattern.vue')
                      },
                      {
                        "name": "CommandPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/CommandPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/CommandPattern.vue')
                      },
                      {
                        "name": "IteratorPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/IteratorPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/IteratorPattern.vue')
                      },
                      {
                        "name": "DecoratorPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/DecoratorPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/DecoratorPattern.vue')
                      },
                      {
                        "name": "AdapterPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/AdapterPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/AdapterPattern.vue')
                      },
                      {
                        "name": "ChainOfResponsibilityPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ChainOfResponsibilityPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/ChainOfResponsibilityPattern.vue')
                      },
                      {
                        "name": "TemplateMethodPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/TemplateMethodPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/TemplateMethodPattern.vue')
                      },
                      {
                        "name": "CompositePattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/CompositePattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/CompositePattern.vue')
                      },
                      {
                        "name": "FlyweightPattern",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/FlyweightPattern",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/DesignPatternImplementation/FlyweightPattern.vue')
                      }
                    ]
                  },
                  {
                    "name": "FunImplementation",
                    "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation",
                    "children": [
                      {
                        "name": "AchieveFibonacci",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveFibonacci",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveFibonacci.vue')
                      },
                      {
                        "name": "JudgeEmptyObject",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/JudgeEmptyObject",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/JudgeEmptyObject.vue')
                      },
                      {
                        "name": "ClosureRelated",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/ClosureRelated",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/ClosureRelated.vue')
                      },
                      {
                        "name": "DebounceThrottle",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/DebounceThrottle",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/DebounceThrottle.vue')
                      },
                      {
                        "name": "AchieveCurry",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveCurry",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveCurry.vue')
                      },
                      {
                        "name": "AchieveBidirectionalBind",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveBidirectionalBind",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveBidirectionalBind.vue')
                      },
                      {
                        "name": "AchieveFrontendRouter",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveFrontendRouter",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveFrontendRouter.vue')
                      },
                      {
                        "name": "AchieveLazyLoad",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveLazyLoad",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveLazyLoad.vue')
                      },
                      {
                        "name": "AchieveBigFileUpload",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveBigFileUpload",
                        "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/FunImplementation/AchieveBigFileUpload.vue')
                      }
                    ]
                  },
                  {
                    "name": "HandwrittenAlgorithm",
                    "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm",
                    "children": [
                      {
                        "name": "HandwrittenBasicAlgorithm",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm",
                        "children": [
                          {
                            "name": "StringRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm",
                            "children": [
                              {
                                "name": "StringBasicAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/StringBasicAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/StringBasicAlgorithm.vue')
                              },
                              {
                                "name": "StringAdvancedAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/StringAdvancedAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/StringAdvancedAlgorithm.vue')
                              },
                              {
                                "name": "MoreStringAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/MoreStringAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StringRelatedAlgorithm/MoreStringAlgorithm.vue')
                              }
                            ]
                          },
                          {
                            "name": "ArrayRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm",
                            "children": [
                              {
                                "name": "SortingAlgorithms",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/SortingAlgorithms",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/SortingAlgorithms.vue')
                              },
                              {
                                "name": "Deduplication",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/Deduplication",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/Deduplication.vue')
                              },
                              {
                                "name": "ArrayBasicAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/ArrayBasicAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/ArrayBasicAlgorithm.vue')
                              },
                              {
                                "name": "ArrayAdvancedAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/ArrayAdvancedAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/ArrayRelatedAlgorithm/ArrayAdvancedAlgorithm.vue')
                              }
                            ]
                          },
                          {
                            "name": "StackRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StackRelatedAlgorithm",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/StackRelatedAlgorithm.vue')
                          },
                          {
                            "name": "QueueRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/QueueRelatedAlgorithm",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/QueueRelatedAlgorithm.vue')
                          },
                          {
                            "name": "LinkedListRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/LinkedListRelatedAlgorithm",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/LinkedListRelatedAlgorithm.vue')
                          },
                          {
                            "name": "BinaryTreeRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm",
                            "children": [
                              {
                                "name": "TreeStructureDataProcessing",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/TreeStructureDataProcessing",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/TreeStructureDataProcessing.vue')
                              },
                              {
                                "name": "BinaryTreeGeneration",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/BinaryTreeGeneration",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/BinaryTreeGeneration.vue')
                              },
                              {
                                "name": "MoreBinaryTreeAlgorithm",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/MoreBinaryTreeAlgorithm",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BinaryTreeRelatedAlgorithm/MoreBinaryTreeAlgorithm.vue')
                              }
                            ]
                          },
                          {
                            "name": "GraphRelatedAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/GraphRelatedAlgorithm",
                            "children": [
                              {
                                "name": "GraphTraversal",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/GraphRelatedAlgorithm/GraphTraversal",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/GraphRelatedAlgorithm/GraphTraversal.vue')
                              }
                            ]
                          },
                          {
                            "name": "BasicSearchAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BasicSearchAlgorithm",
                            "children": [
                              {
                                "name": "BinarySearch",
                                "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BasicSearchAlgorithm/BinarySearch",
                                "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/BasicSearchAlgorithm/BinarySearch.vue')
                              }
                            ]
                          },
                          {
                            "name": "DynamicProgrammingHandwritten",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/DynamicProgrammingHandwritten",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/DynamicProgrammingHandwritten.vue')
                          },
                          {
                            "name": "GreedyAlgorithm",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/GreedyAlgorithm",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenBasicAlgorithm/GreedyAlgorithm.vue')
                          }
                        ]
                      },
                      {
                        "name": "HandwrittenAdvancedAlgorithm",
                        "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm",
                        "children": [
                          {
                            "name": "AchieveDomDiff",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/AchieveDomDiff",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/AchieveDomDiff.vue')
                          },
                          {
                            "name": "AchieveLRU",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/AchieveLRU",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/AchieveLRU.vue')
                          },
                          {
                            "name": "LongestIncreasingSubsequence",
                            "path": "/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/LongestIncreasingSubsequence",
                            "component": () => import('@/views/front/CoreSkills/JavaScript/HandwrittenCode/HandwrittenAlgorithm/HandwrittenAdvancedAlgorithm/LongestIncreasingSubsequence.vue')
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "JSKnowledgepPoints",
                "path": "/front/CoreSkills/JavaScript/JSKnowledgepPoints",
                "component": () => import('@/views/front/CoreSkills/JavaScript/JSKnowledgepPoints.vue')
              },
              {
                "name": "JSCodeSpecification",
                "path": "/front/CoreSkills/JavaScript/JSCodeSpecification",
                "component": () => import('@/views/front/CoreSkills/JavaScript/JSCodeSpecification.vue')
              },
              {
                "name": "CodeCommentAndDescription",
                "path": "/front/CoreSkills/JavaScript/CodeCommentAndDescription",
                "component": () => import('@/views/front/CoreSkills/JavaScript/CodeCommentAndDescription.vue')
              },
              {
                "name": "JSLibrary",
                "path": "/front/CoreSkills/JavaScript/JSLibrary",
                "component": () => import('@/views/front/CoreSkills/JavaScript/JSLibrary.vue')
              }
            ]
          },
          {
            "name": "TypeScript",
            "path": "/front/CoreSkills/TypeScript",
            "children": [
              {
                "name": "WhatIsTypeScript",
                "path": "/front/CoreSkills/TypeScript/WhatIsTypeScript",
                "component": () => import('@/views/front/CoreSkills/TypeScript/WhatIsTypeScript.vue')
              },
              {
                "name": "BasicType",
                "path": "/front/CoreSkills/TypeScript/BasicType",
                "component": () => import('@/views/front/CoreSkills/TypeScript/BasicType.vue')
              },
              {
                "name": "InterfaceAndType",
                "path": "/front/CoreSkills/TypeScript/InterfaceAndType",
                "component": () => import('@/views/front/CoreSkills/TypeScript/InterfaceAndType.vue')
              },
              {
                "name": "EnumAndTuple",
                "path": "/front/CoreSkills/TypeScript/EnumAndTuple",
                "component": () => import('@/views/front/CoreSkills/TypeScript/EnumAndTuple.vue')
              },
              {
                "name": "OptionalPropertiesAndParametersAndReadonlyProperties",
                "path": "/front/CoreSkills/TypeScript/OptionalPropertiesAndParametersAndReadonlyProperties",
                "component": () => import('@/views/front/CoreSkills/TypeScript/OptionalPropertiesAndParametersAndReadonlyProperties.vue')
              },
              {
                "name": "FunctionType",
                "path": "/front/CoreSkills/TypeScript/FunctionType",
                "component": () => import('@/views/front/CoreSkills/TypeScript/FunctionType.vue')
              },
              {
                "name": "ClassInterface",
                "path": "/front/CoreSkills/TypeScript/ClassInterface",
                "component": () => import('@/views/front/CoreSkills/TypeScript/ClassInterface.vue')
              },
              {
                "name": "Generic",
                "path": "/front/CoreSkills/TypeScript/Generic",
                "component": () => import('@/views/front/CoreSkills/TypeScript/Generic.vue')
              },
              {
                "name": "AdvancedType",
                "path": "/front/CoreSkills/TypeScript/AdvancedType",
                "children": [
                  {
                    "name": "IntersectionTypeAndUnionType",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/IntersectionTypeAndUnionType",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/IntersectionTypeAndUnionType.vue')
                  },
                  {
                    "name": "TypeAlias",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/TypeAlias",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/TypeAlias.vue')
                  },
                  {
                    "name": "TypeAssertionAndTypeIndex",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/TypeAssertionAndTypeIndex",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/TypeAssertionAndTypeIndex.vue')
                  },
                  {
                    "name": "MappedTypeAndConditionalType",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/MappedTypeAndConditionalType",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/MappedTypeAndConditionalType.vue')
                  },
                  {
                    "name": "IndexAccessTypeAndDynamicExtensionObject",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/IndexAccessTypeAndDynamicExtensionObject",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/IndexAccessTypeAndDynamicExtensionObject.vue')
                  },
                  {
                    "name": "TypePredicate",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/TypePredicate",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/TypePredicate.vue')
                  },
                  {
                    "name": "FunctionOverloadingAndDeclarationMerging",
                    "path": "/front/CoreSkills/TypeScript/AdvancedType/FunctionOverloadingAndDeclarationMerging",
                    "component": () => import('@/views/front/CoreSkills/TypeScript/AdvancedType/FunctionOverloadingAndDeclarationMerging.vue')
                  }
                ]
              },
              {
                "name": "BuiltInTypeTools",
                "path": "/front/CoreSkills/TypeScript/BuiltInTypeTools",
                "component": () => import('@/views/front/CoreSkills/TypeScript/BuiltInTypeTools.vue')
              },
              {
                "name": "TSDecorator",
                "path": "/front/CoreSkills/TypeScript/TSDecorator",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TSDecorator.vue')
              },
              {
                "name": "TSVarianceAndContravarianceAndBivarianceAndInvariance",
                "path": "/front/CoreSkills/TypeScript/TSVarianceAndContravarianceAndBivarianceAndInvariance",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TSVarianceAndContravarianceAndBivarianceAndInvariance.vue')
              },
              {
                "name": "Tsconfig",
                "path": "/front/CoreSkills/TypeScript/Tsconfig",
                "component": () => import('@/views/front/CoreSkills/TypeScript/Tsconfig.vue')
              },
              {
                "name": "ModuleAndNamespaceAndTripleSlashDirective",
                "path": "/front/CoreSkills/TypeScript/ModuleAndNamespaceAndTripleSlashDirective",
                "component": () => import('@/views/front/CoreSkills/TypeScript/ModuleAndNamespaceAndTripleSlashDirective.vue')
              },
              {
                "name": "DeclarationFile",
                "path": "/front/CoreSkills/TypeScript/DeclarationFile",
                "component": () => import('@/views/front/CoreSkills/TypeScript/DeclarationFile.vue')
              },
              {
                "name": "TypeTreadmill",
                "path": "/front/CoreSkills/TypeScript/TypeTreadmill",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TypeTreadmill.vue')
              },
              {
                "name": "TSCodeSpecification",
                "path": "/front/CoreSkills/TypeScript/TSCodeSpecification",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TSCodeSpecification.vue')
              },
              {
                "name": "TS5",
                "path": "/front/CoreSkills/TypeScript/TS5",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TS5.vue')
              },
              {
                "name": "TSProsAndCons",
                "path": "/front/CoreSkills/TypeScript/TSProsAndCons",
                "component": () => import('@/views/front/CoreSkills/TypeScript/TSProsAndCons.vue')
              }
            ]
          },
          {
            "name": "NetworkBasic",
            "path": "/front/CoreSkills/NetworkBasic",
            "children": [
              {
                "name": "FrontRequest",
                "path": "/front/CoreSkills/NetworkBasic/FrontRequest",
                "children": [
                  {
                    "name": "AsyncRequest",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest",
                    "children": [
                      {
                        "name": "Fetch",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Fetch",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Fetch.vue')
                      },
                      {
                        "name": "Ajax",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Ajax",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Ajax.vue')
                      },
                      {
                        "name": "Axios",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Axios",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/Axios.vue')
                      },
                      {
                        "name": "RequestConfiguration",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/RequestConfiguration",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/RequestConfiguration.vue')
                      },
                      {
                        "name": "FetchAndAjaxAndAxios",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/FetchAndAjaxAndAxios",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/FetchAndAjaxAndAxios.vue')
                      },
                      {
                        "name": "AbortController",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/AbortController",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/AsyncRequest/AbortController.vue')
                      }
                    ]
                  },
                  {
                    "name": "RequestHeader",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/RequestHeader",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/RequestHeader.vue')
                  },
                  {
                    "name": "RequestBody",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/RequestBody",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/RequestBody.vue')
                  },
                  {
                    "name": "UploadControl",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/UploadControl",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/UploadControl.vue')
                  },
                  {
                    "name": "ChunkUploadAndBreakpointContinuation",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/ChunkUploadAndBreakpointContinuation",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/ChunkUploadAndBreakpointContinuation.vue')
                  },
                  {
                    "name": "FileDownload",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/FileDownload",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/FileDownload.vue')
                  },
                  {
                    "name": "StatusCode",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/StatusCode",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/StatusCode.vue')
                  },
                  {
                    "name": "CORS",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/CORS",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/CORS.vue')
                  },
                  {
                    "name": "GetAndPost",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/GetAndPost",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/GetAndPost.vue')
                  },
                  {
                    "name": "InterfaceStyle",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle",
                    "children": [
                      {
                        "name": "Restful",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/Restful",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/Restful.vue')
                      },
                      {
                        "name": "GraphQL",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/GraphQL",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/GraphQL.vue')
                      },
                      {
                        "name": "RestfulAndGraphQL",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/RestfulAndGraphQL",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/InterfaceStyle/RestfulAndGraphQL.vue')
                      }
                    ]
                  },
                  {
                    "name": "CookieSessionToken",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/CookieSessionToken",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/CookieSessionToken.vue')
                  },
                  {
                    "name": "SecurityControl",
                    "path": "/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl",
                    "children": [
                      {
                        "name": "CookieUsage",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/CookieUsage",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/CookieUsage.vue')
                      },
                      {
                        "name": "TokenUsage",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/TokenUsage",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/TokenUsage.vue')
                      },
                      {
                        "name": "FrontPasswordEncryption",
                        "path": "/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/FrontPasswordEncryption",
                        "component": () => import('@/views/front/CoreSkills/NetworkBasic/FrontRequest/SecurityControl/FrontPasswordEncryption.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "HttpOverview",
                "path": "/front/CoreSkills/NetworkBasic/HttpOverview",
                "children": [
                  {
                    "name": "Http",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/Http",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/Http.vue')
                  },
                  {
                    "name": "Https",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/Https",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/Https.vue')
                  },
                  {
                    "name": "HTTP2",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/HTTP2",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/HTTP2.vue')
                  },
                  {
                    "name": "HTTPHeadOfLineBlocking",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/HTTPHeadOfLineBlocking",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/HTTPHeadOfLineBlocking.vue')
                  },
                  {
                    "name": "SSEOverview",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/SSEOverview",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/SSEOverview.vue')
                  },
                  {
                    "name": "HTTP2Multiplex",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/HTTP2Multiplex",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/HTTP2Multiplex.vue')
                  },
                  {
                    "name": "HTTP3",
                    "path": "/front/CoreSkills/NetworkBasic/HttpOverview/HTTP3",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HttpOverview/HTTP3.vue')
                  }
                ]
              },
              {
                "name": "OtherApplicationLayerProtocols",
                "path": "/front/CoreSkills/NetworkBasic/OtherApplicationLayerProtocols",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/OtherApplicationLayerProtocols.vue')
              },
              {
                "name": "TCP1",
                "path": "/front/CoreSkills/NetworkBasic/TCP1",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/TCP1.vue')
              },
              {
                "name": "CongestionControl",
                "path": "/front/CoreSkills/NetworkBasic/CongestionControl",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/CongestionControl.vue')
              },
              {
                "name": "Network7Layers",
                "path": "/front/CoreSkills/NetworkBasic/Network7Layers",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/Network7Layers.vue')
              },
              {
                "name": "TLS1",
                "path": "/front/CoreSkills/NetworkBasic/TLS1",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/TLS1.vue')
              },
              {
                "name": "DNSDomain",
                "path": "/front/CoreSkills/NetworkBasic/DNSDomain",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/DNSDomain.vue')
              },
              {
                "name": "CDN",
                "path": "/front/CoreSkills/NetworkBasic/CDN",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/CDN.vue')
              },
              {
                "name": "HCJZ",
                "path": "/front/CoreSkills/NetworkBasic/HCJZ",
                "children": [
                  {
                    "name": "CacheProfile",
                    "path": "/front/CoreSkills/NetworkBasic/HCJZ/CacheProfile",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HCJZ/CacheProfile.vue')
                  },
                  {
                    "name": "StrongCache",
                    "path": "/front/CoreSkills/NetworkBasic/HCJZ/StrongCache",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HCJZ/StrongCache.vue')
                  },
                  {
                    "name": "NegotiateCache",
                    "path": "/front/CoreSkills/NetworkBasic/HCJZ/NegotiateCache",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HCJZ/NegotiateCache.vue')
                  },
                  {
                    "name": "ServiceWorker",
                    "path": "/front/CoreSkills/NetworkBasic/HCJZ/ServiceWorker",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/HCJZ/ServiceWorker.vue')
                  }
                ]
              },
              {
                "name": "ProxyAndReverseProxy",
                "path": "/front/CoreSkills/NetworkBasic/ProxyAndReverseProxy",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/ProxyAndReverseProxy.vue')
              },
              {
                "name": "LoadBalance",
                "path": "/front/CoreSkills/NetworkBasic/LoadBalance",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/LoadBalance.vue')
              },
              {
                "name": "cURL",
                "path": "/front/CoreSkills/NetworkBasic/cURL",
                "component": () => import('@/views/front/CoreSkills/NetworkBasic/cURL.vue')
              },
              {
                "name": "Server",
                "path": "/front/CoreSkills/NetworkBasic/Server",
                "children": [
                  {
                    "name": "ServerIntroduction",
                    "path": "/front/CoreSkills/NetworkBasic/Server/ServerIntroduction",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/Server/ServerIntroduction.vue')
                  },
                  {
                    "name": "WebServer",
                    "path": "/front/CoreSkills/NetworkBasic/Server/WebServer",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/Server/WebServer.vue')
                  },
                  {
                    "name": "TcpUdpServer",
                    "path": "/front/CoreSkills/NetworkBasic/Server/TcpUdpServer",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/Server/TcpUdpServer.vue')
                  },
                  {
                    "name": "NodeServer",
                    "path": "/front/CoreSkills/NetworkBasic/Server/NodeServer",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/Server/NodeServer.vue')
                  },
                  {
                    "name": "Nginx",
                    "path": "/front/CoreSkills/NetworkBasic/Server/Nginx",
                    "component": () => import('@/views/front/CoreSkills/NetworkBasic/Server/Nginx.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "Browser",
            "path": "/front/CoreSkills/Browser",
            "children": [
              {
                "name": "XLLC",
                "path": "/front/CoreSkills/Browser/XLLC",
                "children": [
                  {
                    "name": "NetworkProcess",
                    "path": "/front/CoreSkills/Browser/XLLC/NetworkProcess",
                    "component": () => import('@/views/front/CoreSkills/Browser/XLLC/NetworkProcess.vue')
                  },
                  {
                    "name": "ResourceLoadingProcess",
                    "path": "/front/CoreSkills/Browser/XLLC/ResourceLoadingProcess",
                    "component": () => import('@/views/front/CoreSkills/Browser/XLLC/ResourceLoadingProcess.vue')
                  },
                  {
                    "name": "RenderProcess",
                    "path": "/front/CoreSkills/Browser/XLLC/RenderProcess",
                    "component": () => import('@/views/front/CoreSkills/Browser/XLLC/RenderProcess.vue')
                  },
                  {
                    "name": "BrowserRenderProcess",
                    "path": "/front/CoreSkills/Browser/XLLC/BrowserRenderProcess",
                    "component": () => import('@/views/front/CoreSkills/Browser/XLLC/BrowserRenderProcess.vue')
                  }
                ]
              },
              {
                "name": "ZW1Z",
                "path": "/front/CoreSkills/Browser/ZW1Z",
                "component": () => import('@/views/front/CoreSkills/Browser/ZW1Z.vue')
              },
              {
                "name": "V8Engine",
                "path": "/front/CoreSkills/Browser/V8Engine",
                "children": [
                  {
                    "name": "V8EngineIntroduction",
                    "path": "/front/CoreSkills/Browser/V8Engine/V8EngineIntroduction",
                    "component": () => import('@/views/front/CoreSkills/Browser/V8Engine/V8EngineIntroduction.vue')
                  },
                  {
                    "name": "V8GarbageCollection",
                    "path": "/front/CoreSkills/Browser/V8Engine/V8GarbageCollection",
                    "component": () => import('@/views/front/CoreSkills/Browser/V8Engine/V8GarbageCollection.vue')
                  },
                  {
                    "name": "V8SomeMechanism",
                    "path": "/front/CoreSkills/Browser/V8Engine/V8SomeMechanism",
                    "component": () => import('@/views/front/CoreSkills/Browser/V8Engine/V8SomeMechanism.vue')
                  }
                ]
              },
              {
                "name": "BrowserProcessandThread",
                "path": "/front/CoreSkills/Browser/BrowserProcessandThread",
                "component": () => import('@/views/front/CoreSkills/Browser/BrowserProcessandThread.vue')
              },
              {
                "name": "BrowserRenderingLayer",
                "path": "/front/CoreSkills/Browser/BrowserRenderingLayer",
                "component": () => import('@/views/front/CoreSkills/Browser/BrowserRenderingLayer.vue')
              },
              {
                "name": "BrowserResourceCache",
                "path": "/front/CoreSkills/Browser/BrowserResourceCache",
                "component": () => import('@/views/front/CoreSkills/Browser/BrowserResourceCache.vue')
              }
            ]
          },
          {
            "name": "DesignPatterns",
            "path": "/front/CoreSkills/DesignPatterns",
            "children": [
              {
                "name": "DesignPatternsOverview",
                "path": "/front/CoreSkills/DesignPatterns/DesignPatternsOverview",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/DesignPatternsOverview.vue')
              },
              {
                "name": "Singleton",
                "path": "/front/CoreSkills/DesignPatterns/Singleton",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Singleton.vue')
              },
              {
                "name": "Factory",
                "path": "/front/CoreSkills/DesignPatterns/Factory",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Factory.vue')
              },
              {
                "name": "AbstractFactory",
                "path": "/front/CoreSkills/DesignPatterns/AbstractFactory",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/AbstractFactory.vue')
              },
              {
                "name": "Observer",
                "path": "/front/CoreSkills/DesignPatterns/Observer",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Observer.vue')
              },
              {
                "name": "PublishSubscribe",
                "path": "/front/CoreSkills/DesignPatterns/PublishSubscribe",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/PublishSubscribe.vue')
              },
              {
                "name": "PublishSubscribeAndObserverDifference",
                "path": "/front/CoreSkills/DesignPatterns/PublishSubscribeAndObserverDifference",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/PublishSubscribeAndObserverDifference.vue')
              },
              {
                "name": "Strategy",
                "path": "/front/CoreSkills/DesignPatterns/Strategy",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Strategy.vue')
              },
              {
                "name": "Adapter",
                "path": "/front/CoreSkills/DesignPatterns/Adapter",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Adapter.vue')
              },
              {
                "name": "Decorator",
                "path": "/front/CoreSkills/DesignPatterns/Decorator",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Decorator.vue')
              },
              {
                "name": "Proxy",
                "path": "/front/CoreSkills/DesignPatterns/Proxy",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Proxy.vue')
              },
              {
                "name": "ChainOfResponsibility",
                "path": "/front/CoreSkills/DesignPatterns/ChainOfResponsibility",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/ChainOfResponsibility.vue')
              },
              {
                "name": "Command",
                "path": "/front/CoreSkills/DesignPatterns/Command",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Command.vue')
              },
              {
                "name": "State",
                "path": "/front/CoreSkills/DesignPatterns/State",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/State.vue')
              },
              {
                "name": "TemplateMethod",
                "path": "/front/CoreSkills/DesignPatterns/TemplateMethod",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/TemplateMethod.vue')
              },
              {
                "name": "Iterator",
                "path": "/front/CoreSkills/DesignPatterns/Iterator",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Iterator.vue')
              },
              {
                "name": "Composite",
                "path": "/front/CoreSkills/DesignPatterns/Composite",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Composite.vue')
              },
              {
                "name": "Flyweight",
                "path": "/front/CoreSkills/DesignPatterns/Flyweight",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Flyweight.vue')
              },
              {
                "name": "Memento",
                "path": "/front/CoreSkills/DesignPatterns/Memento",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Memento.vue')
              },
              {
                "name": "Prototype",
                "path": "/front/CoreSkills/DesignPatterns/Prototype",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/Prototype.vue')
              },
              {
                "name": "InterceptorFilter",
                "path": "/front/CoreSkills/DesignPatterns/InterceptorFilter",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/InterceptorFilter.vue')
              },
              {
                "name": "MVC",
                "path": "/front/CoreSkills/DesignPatterns/MVC",
                "component": () => import('@/views/front/CoreSkills/DesignPatterns/MVC.vue')
              }
            ]
          },
          {
            "name": "Performance",
            "path": "/front/CoreSkills/Performance",
            "children": [
              {
                "name": "PerformanceOverview",
                "path": "/front/CoreSkills/Performance/PerformanceOverview",
                "component": () => import('@/views/front/CoreSkills/Performance/PerformanceOverview.vue')
              },
              {
                "name": "PerformanceMetrics",
                "path": "/front/CoreSkills/Performance/PerformanceMetrics",
                "component": () => import('@/views/front/CoreSkills/Performance/PerformanceMetrics.vue')
              },
              {
                "name": "PerformanceWatch",
                "path": "/front/CoreSkills/Performance/PerformanceWatch",
                "children": [
                  {
                    "name": "Code",
                    "path": "/front/CoreSkills/Performance/PerformanceWatch/Code",
                    "children": [
                      {
                        "name": "PerformanceApi",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceApi",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceApi.vue')
                      },
                      {
                        "name": "PerformanceObserver",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceObserver",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceObserver.vue')
                      },
                      {
                        "name": "PerformanceAndPerformanceObserver",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceAndPerformanceObserver",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/Code/PerformanceAndPerformanceObserver.vue')
                      },
                      {
                        "name": "WebVitals",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/Code/WebVitals",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/Code/WebVitals.vue')
                      },
                      {
                        "name": "MutationObserverWatchPerformance",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/Code/MutationObserverWatchPerformance",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/Code/MutationObserverWatchPerformance.vue')
                      }
                    ]
                  },
                  {
                    "name": "ToolAspect",
                    "path": "/front/CoreSkills/Performance/PerformanceWatch/ToolAspect",
                    "children": [
                      {
                        "name": "ChromeDevTools",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/ToolAspect/ChromeDevTools",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/ToolAspect/ChromeDevTools.vue')
                      },
                      {
                        "name": "Lighthouse",
                        "path": "/front/CoreSkills/Performance/PerformanceWatch/ToolAspect/Lighthouse",
                        "component": () => import('@/views/front/CoreSkills/Performance/PerformanceWatch/ToolAspect/Lighthouse.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "NetworkAspect",
                "path": "/front/CoreSkills/Performance/NetworkAspect",
                "children": [
                  {
                    "name": "FrontCache",
                    "path": "/front/CoreSkills/Performance/NetworkAspect/FrontCache",
                    "component": () => import('@/views/front/CoreSkills/Performance/NetworkAspect/FrontCache.vue')
                  },
                  {
                    "name": "CDNAcceleration",
                    "path": "/front/CoreSkills/Performance/NetworkAspect/CDNAcceleration",
                    "component": () => import('@/views/front/CoreSkills/Performance/NetworkAspect/CDNAcceleration.vue')
                  },
                  {
                    "name": "SSE",
                    "path": "/front/CoreSkills/Performance/NetworkAspect/SSE",
                    "component": () => import('@/views/front/CoreSkills/Performance/NetworkAspect/SSE.vue')
                  }
                ]
              },
              {
                "name": "CodeAspect",
                "path": "/front/CoreSkills/Performance/CodeAspect",
                "children": [
                  {
                    "name": "CssPerformanceOptimization",
                    "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization",
                    "children": [
                      {
                        "name": "CssSelectorOptimization",
                        "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CssSelectorOptimization",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CssSelectorOptimization.vue')
                      },
                      {
                        "name": "CssHardwareAcceleration",
                        "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CssHardwareAcceleration",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CssHardwareAcceleration.vue')
                      },
                      {
                        "name": "ReduceRepaint",
                        "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/ReduceRepaint",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/ReduceRepaint.vue')
                      },
                      {
                        "name": "CSSAnimation",
                        "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CSSAnimation",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/CSSAnimation.vue')
                      },
                      {
                        "name": "SpriteImage",
                        "path": "/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/SpriteImage",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/CssPerformanceOptimization/SpriteImage.vue')
                      }
                    ]
                  },
                  {
                    "name": "JsCodeOptimization",
                    "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization",
                    "children": [
                      {
                        "name": "AlgorithmOptimization",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/AlgorithmOptimization",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/AlgorithmOptimization.vue')
                      },
                      {
                        "name": "MemoryManagement2",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2",
                        "children": [
                          {
                            "name": "MemoryManagement3",
                            "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/MemoryManagement3",
                            "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/MemoryManagement3.vue')
                          },
                          {
                            "name": "UnusedReferenceClear",
                            "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/UnusedReferenceClear",
                            "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/UnusedReferenceClear.vue')
                          },
                          {
                            "name": "WeakMapAndWeakSetAndWeakRef",
                            "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/WeakMapAndWeakSetAndWeakRef",
                            "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/MemoryManagement2/WeakMapAndWeakSetAndWeakRef.vue')
                          }
                        ]
                      },
                      {
                        "name": "ReduceRepaint2",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/ReduceRepaint2",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/ReduceRepaint2.vue')
                      },
                      {
                        "name": "EventDelegation",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/EventDelegation",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/EventDelegation.vue')
                      },
                      {
                        "name": "DebounceAndThrottle",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/DebounceAndThrottle",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/DebounceAndThrottle.vue')
                      },
                      {
                        "name": "TailCall",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TailCall",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TailCall.vue')
                      },
                      {
                        "name": "BounceFunction2",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/BounceFunction2",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/BounceFunction2.vue')
                      },
                      {
                        "name": "TreeShaking",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TreeShaking",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TreeShaking.vue')
                      },
                      {
                        "name": "WebWorkerDeal",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/WebWorkerDeal",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/WebWorkerDeal.vue')
                      },
                      {
                        "name": "TimeSliceOptimization",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TimeSliceOptimization",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/TimeSliceOptimization.vue')
                      },
                      {
                        "name": "VirtualScrollList",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/VirtualScrollList",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/VirtualScrollList.vue')
                      },
                      {
                        "name": "RequestAnimationFrame2",
                        "path": "/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/RequestAnimationFrame2",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/JsCodeOptimization/RequestAnimationFrame2.vue')
                      }
                    ]
                  },
                  {
                    "name": "LoadOptimization",
                    "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization",
                    "children": [
                      {
                        "name": "LazyLoadAndpreLoad",
                        "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization/LazyLoadAndpreLoad",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/LoadOptimization/LazyLoadAndpreLoad.vue')
                      },
                      {
                        "name": "CodeSplit",
                        "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization/CodeSplit",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/LoadOptimization/CodeSplit.vue')
                      },
                      {
                        "name": "ImageLoadOptimization",
                        "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization/ImageLoadOptimization",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/LoadOptimization/ImageLoadOptimization.vue')
                      },
                      {
                        "name": "SkeletonScreenAndTransitionAnimation",
                        "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization/SkeletonScreenAndTransitionAnimation",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/LoadOptimization/SkeletonScreenAndTransitionAnimation.vue')
                      },
                      {
                        "name": "FontIcon",
                        "path": "/front/CoreSkills/Performance/CodeAspect/LoadOptimization/FontIcon",
                        "component": () => import('@/views/front/CoreSkills/Performance/CodeAspect/LoadOptimization/FontIcon.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "ProgramManageAspect",
                "path": "/front/CoreSkills/Performance/ProgramManageAspect",
                "children": [
                  {
                    "name": "GzipCompression",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/GzipCompression",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/GzipCompression.vue')
                  },
                  {
                    "name": "BrotliCompression",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/BrotliCompression",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/BrotliCompression.vue')
                  },
                  {
                    "name": "SSR",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/SSR",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/SSR.vue')
                  },
                  {
                    "name": "SSG",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/SSG",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/SSG.vue')
                  },
                  {
                    "name": "ISR",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/ISR",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/ISR.vue')
                  },
                  {
                    "name": "PackingStrategy",
                    "path": "/front/CoreSkills/Performance/ProgramManageAspect/PackingStrategy",
                    "component": () => import('@/views/front/CoreSkills/Performance/ProgramManageAspect/PackingStrategy.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "FunctionImplementation",
            "path": "/front/CoreSkills/FunctionImplementation",
            "children": [
              {
                "name": "StyleRelated",
                "path": "/front/CoreSkills/FunctionImplementation/StyleRelated",
                "children": [
                  {
                    "name": "WebsiteThemeSwitch",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteThemeSwitch",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteThemeSwitch.vue')
                  },
                  {
                    "name": "WebsiteLanguageSwitch",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteLanguageSwitch",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteLanguageSwitch.vue')
                  },
                  {
                    "name": "WebsiteLoadingProgress",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteLoadingProgress",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/WebsiteLoadingProgress.vue')
                  },
                  {
                    "name": "InfiniteScroll",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/InfiniteScroll",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/InfiniteScroll.vue')
                  },
                  {
                    "name": "PdfPreview",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/PdfPreview",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/PdfPreview.vue')
                  },
                  {
                    "name": "Watermark",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/Watermark",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/Watermark.vue')
                  },
                  {
                    "name": "Carousel",
                    "path": "/front/CoreSkills/FunctionImplementation/StyleRelated/Carousel",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/StyleRelated/Carousel.vue')
                  }
                ]
              },
              {
                "name": "UserOperationRelated",
                "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated",
                "children": [
                  {
                    "name": "FormLinkage",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/FormLinkage",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/FormLinkage.vue')
                  },
                  {
                    "name": "SingleSignOn1",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/SingleSignOn1",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/SingleSignOn1.vue')
                  },
                  {
                    "name": "SiteSearch",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/SiteSearch",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/SiteSearch.vue')
                  },
                  {
                    "name": "RightClickMenu",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/RightClickMenu",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/RightClickMenu.vue')
                  },
                  {
                    "name": "ImageUpload",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/ImageUpload",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/ImageUpload.vue')
                  },
                  {
                    "name": "RichTextEditor",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/RichTextEditor",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/RichTextEditor.vue')
                  },
                  {
                    "name": "DisableUserOperation",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/DisableUserOperation",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/DisableUserOperation.vue')
                  },
                  {
                    "name": "PullUpAndPullDown",
                    "path": "/front/CoreSkills/FunctionImplementation/UserOperationRelated/PullUpAndPullDown",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/UserOperationRelated/PullUpAndPullDown.vue')
                  }
                ]
              },
              {
                "name": "DataRelated2",
                "path": "/front/CoreSkills/FunctionImplementation/DataRelated2",
                "children": [
                  {
                    "name": "SeoAndOptimization",
                    "path": "/front/CoreSkills/FunctionImplementation/DataRelated2/SeoAndOptimization",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/DataRelated2/SeoAndOptimization.vue')
                  },
                  {
                    "name": "DataTracking",
                    "path": "/front/CoreSkills/FunctionImplementation/DataRelated2/DataTracking",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/DataRelated2/DataTracking.vue')
                  },
                  {
                    "name": "DataVisualization",
                    "path": "/front/CoreSkills/FunctionImplementation/DataRelated2/DataVisualization",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/DataRelated2/DataVisualization.vue')
                  },
                  {
                    "name": "ResourceLoadFailure",
                    "path": "/front/CoreSkills/FunctionImplementation/DataRelated2/ResourceLoadFailure",
                    "component": () => import('@/views/front/CoreSkills/FunctionImplementation/DataRelated2/ResourceLoadFailure.vue')
                  }
                ]
              },
              {
                "name": "CodeRelated2",
                "path": "/front/CoreSkills/FunctionImplementation/CodeRelated2",
                "children": [
                  {
                    "name": "FormEngine",
                    "path": "/front/CoreSkills/FunctionImplementation/CodeRelated2/FormEngine",
                    "children": [
                      {
                        "name": "FormEngineIntroduction",
                        "path": "/front/CoreSkills/FunctionImplementation/CodeRelated2/FormEngine/FormEngineIntroduction",
                        "component": () => import('@/views/front/CoreSkills/FunctionImplementation/CodeRelated2/FormEngine/FormEngineIntroduction.vue')
                      },
                      {
                        "name": "FormEngineImplementation",
                        "path": "/front/CoreSkills/FunctionImplementation/CodeRelated2/FormEngine/FormEngineImplementation",
                        "component": () => import('@/views/front/CoreSkills/FunctionImplementation/CodeRelated2/FormEngine/FormEngineImplementation.vue')
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "name": "FrontendDebug",
            "path": "/front/CoreSkills/FrontendDebug",
            "children": [
              {
                "name": "FrontendDebugOverview",
                "path": "/front/CoreSkills/FrontendDebug/FrontendDebugOverview",
                "component": () => import('@/views/front/CoreSkills/FrontendDebug/FrontendDebugOverview.vue')
              },
              {
                "name": "Console",
                "path": "/front/CoreSkills/FrontendDebug/Console",
                "component": () => import('@/views/front/CoreSkills/FrontendDebug/Console.vue')
              },
              {
                "name": "BreakpointDebug",
                "path": "/front/CoreSkills/FrontendDebug/BreakpointDebug",
                "component": () => import('@/views/front/CoreSkills/FrontendDebug/BreakpointDebug.vue')
              },
              {
                "name": "DevtoolsDebugTool",
                "path": "/front/CoreSkills/FrontendDebug/DevtoolsDebugTool",
                "component": () => import('@/views/front/CoreSkills/FrontendDebug/DevtoolsDebugTool.vue')
              },
              {
                "name": "SourceMap1",
                "path": "/front/CoreSkills/FrontendDebug/SourceMap1",
                "component": () => import('@/views/front/CoreSkills/FrontendDebug/SourceMap1.vue')
              }
            ]
          }
        ]
      },
      {
        "name": "FrameworksAndEngineering",
        "path": "/front/FrameworksAndEngineering",
        "children": [
          {
            "name": "SPAIntroductionAndOptimization",
            "path": "/front/FrameworksAndEngineering/SPAIntroductionAndOptimization",
            "component": () => import('@/views/front/FrameworksAndEngineering/SPAIntroductionAndOptimization.vue')
          },
          {
            "name": "Signals",
            "path": "/front/FrameworksAndEngineering/Signals",
            "component": () => import('@/views/front/FrameworksAndEngineering/Signals.vue')
          },
          {
            "name": "MVVMAndMVCAndMVP",
            "path": "/front/FrameworksAndEngineering/MVVMAndMVCAndMVP",
            "component": () => import('@/views/front/FrameworksAndEngineering/MVVMAndMVCAndMVP.vue')
          },
          {
            "name": "React",
            "path": "/front/FrameworksAndEngineering/React",
            "children": [
              {
                "name": "ReactProfile",
                "path": "/front/FrameworksAndEngineering/React/ReactProfile",
                "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactProfile.vue')
              },
              {
                "name": "ReactBasicKnowledge",
                "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge",
                "children": [
                  {
                    "name": "FunctionComponentsAndClassComponents",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/FunctionComponentsAndClassComponents",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/FunctionComponentsAndClassComponents.vue')
                  },
                  {
                    "name": "Hooks",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks",
                    "children": [
                      {
                        "name": "HooksIntroduction",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/HooksIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/HooksIntroduction.vue')
                      },
                      {
                        "name": "useEffectAnduseLayoutEffect",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useEffectAnduseLayoutEffect",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useEffectAnduseLayoutEffect.vue')
                      },
                      {
                        "name": "useInsertionEffect",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useInsertionEffect",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useInsertionEffect.vue')
                      },
                      {
                        "name": "useRefAnduseImperativeHandle",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useRefAnduseImperativeHandle",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useRefAnduseImperativeHandle.vue')
                      },
                      {
                        "name": "useMemoAnduseCallback",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useMemoAnduseCallback",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useMemoAnduseCallback.vue')
                      },
                      {
                        "name": "useSyncExternalStore",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useSyncExternalStore",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/useSyncExternalStore.vue')
                      },
                      {
                        "name": "CustomHooks2",
                        "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/CustomHooks2",
                        "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/Hooks/CustomHooks2.vue')
                      }
                    ]
                  },
                  {
                    "name": "ComponentCommunication1",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ComponentCommunication1",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ComponentCommunication1.vue')
                  },
                  {
                    "name": "ReactLifeCycle",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactLifeCycle",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactLifeCycle.vue')
                  },
                  {
                    "name": "FunctionComponentsReactLifeCycle",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/FunctionComponentsReactLifeCycle",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/FunctionComponentsReactLifeCycle.vue')
                  },
                  {
                    "name": "HOC",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/HOC",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/HOC.vue')
                  },
                  {
                    "name": "ReactBuiltInComponents",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactBuiltInComponents",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactBuiltInComponents.vue')
                  },
                  {
                    "name": "AtomicDesign",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/AtomicDesign",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/AtomicDesign.vue')
                  },
                  {
                    "name": "ReactAnimation",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactAnimation",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactAnimation.vue')
                  },
                  {
                    "name": "ReactCss",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactCss",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactCss.vue')
                  },
                  {
                    "name": "ReactErrorHandling",
                    "path": "/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactErrorHandling",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactBasicKnowledge/ReactErrorHandling.vue')
                  }
                ]
              },
              {
                "name": "React18NewFeatures",
                "path": "/front/FrameworksAndEngineering/React/React18NewFeatures",
                "component": () => import('@/views/front/FrameworksAndEngineering/React/React18NewFeatures.vue')
              },
              {
                "name": "ReactNewFeatures",
                "path": "/front/FrameworksAndEngineering/React/ReactNewFeatures",
                "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactNewFeatures.vue')
              },
              {
                "name": "ReactUnderlyingPrinciples",
                "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples",
                "children": [
                  {
                    "name": "ReactPrincipleOverview",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactPrincipleOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactPrincipleOverview.vue')
                  },
                  {
                    "name": "HooksPrinciple",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/HooksPrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/HooksPrinciple.vue')
                  },
                  {
                    "name": "ImplementUseState",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ImplementUseState",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ImplementUseState.vue')
                  },
                  {
                    "name": "ImplementUseEffect",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ImplementUseEffect",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ImplementUseEffect.vue')
                  },
                  {
                    "name": "SetStateWhyIsAsync",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/SetStateWhyIsAsync",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/SetStateWhyIsAsync.vue')
                  },
                  {
                    "name": "SetStatePrinciple",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/SetStatePrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/SetStatePrinciple.vue')
                  },
                  {
                    "name": "ReactVirtualDOM",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactVirtualDOM",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactVirtualDOM.vue')
                  },
                  {
                    "name": "VirtualDOMProsAndCons",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/VirtualDOMProsAndCons",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/VirtualDOMProsAndCons.vue')
                  },
                  {
                    "name": "DomDiffAlgorithm",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/DomDiffAlgorithm",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/DomDiffAlgorithm.vue')
                  },
                  {
                    "name": "ReactHooksWhyOnlyAtTopLevel",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactHooksWhyOnlyAtTopLevel",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactHooksWhyOnlyAtTopLevel.vue')
                  },
                  {
                    "name": "ReactEvent",
                    "path": "/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactEvent",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactUnderlyingPrinciples/ReactEvent.vue')
                  }
                ]
              },
              {
                "name": "ReactPerformanceOptimization",
                "path": "/front/FrameworksAndEngineering/React/ReactPerformanceOptimization",
                "children": [
                  {
                    "name": "ReactPerformanceOptimizationOverview",
                    "path": "/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactPerformanceOptimizationOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactPerformanceOptimizationOverview.vue')
                  },
                  {
                    "name": "ReactPerformanceMeasurement",
                    "path": "/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactPerformanceMeasurement",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactPerformanceMeasurement.vue')
                  },
                  {
                    "name": "ReactMemoAndPureComponent",
                    "path": "/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactMemoAndPureComponent",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactMemoAndPureComponent.vue')
                  },
                  {
                    "name": "ReactFiber",
                    "path": "/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactFiber",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactPerformanceOptimization/ReactFiber.vue')
                  }
                ]
              },
              {
                "name": "ReactEcosystem",
                "path": "/front/FrameworksAndEngineering/React/ReactEcosystem",
                "children": [
                  {
                    "name": "ReactStateManagementOverview",
                    "path": "/front/FrameworksAndEngineering/React/ReactEcosystem/ReactStateManagementOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactEcosystem/ReactStateManagementOverview.vue')
                  },
                  {
                    "name": "ReactComponentCommunication",
                    "path": "/front/FrameworksAndEngineering/React/ReactEcosystem/ReactComponentCommunication",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactEcosystem/ReactComponentCommunication.vue')
                  },
                  {
                    "name": "ReactScaffolding",
                    "path": "/front/FrameworksAndEngineering/React/ReactEcosystem/ReactScaffolding",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactEcosystem/ReactScaffolding.vue')
                  },
                  {
                    "name": "ReactUIFramework",
                    "path": "/front/FrameworksAndEngineering/React/ReactEcosystem/ReactUIFramework",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactEcosystem/ReactUIFramework.vue')
                  },
                  {
                    "name": "Nextjs",
                    "path": "/front/FrameworksAndEngineering/React/ReactEcosystem/Nextjs",
                    "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactEcosystem/Nextjs.vue')
                  }
                ]
              },
              {
                "name": "ReactKnowledgeSummary",
                "path": "/front/FrameworksAndEngineering/React/ReactKnowledgeSummary",
                "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactKnowledgeSummary.vue')
              },
              {
                "name": "ReactProjectCodeStandard",
                "path": "/front/FrameworksAndEngineering/React/ReactProjectCodeStandard",
                "component": () => import('@/views/front/FrameworksAndEngineering/React/ReactProjectCodeStandard.vue')
              }
            ]
          },
          {
            "name": "Vue",
            "path": "/front/FrameworksAndEngineering/Vue",
            "children": [
              {
                "name": "VueProfile",
                "path": "/front/FrameworksAndEngineering/Vue/VueProfile",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueProfile.vue')
              },
              {
                "name": "VueBasicKnowledge",
                "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge",
                "children": [
                  {
                    "name": "LifeCycle",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/LifeCycle",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/LifeCycle.vue')
                  },
                  {
                    "name": "ComponentCommunication",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/ComponentCommunication",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/ComponentCommunication.vue')
                  },
                  {
                    "name": "VueModifier",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueModifier",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueModifier.vue')
                  },
                  {
                    "name": "NextTick",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/NextTick",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/NextTick.vue')
                  },
                  {
                    "name": "CustomDirective",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomDirective",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomDirective.vue')
                  },
                  {
                    "name": "CustomDirective2",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomDirective2",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomDirective2.vue')
                  },
                  {
                    "name": "WatchAndWatchEffectAndComputed",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/WatchAndWatchEffectAndComputed",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/WatchAndWatchEffectAndComputed.vue')
                  },
                  {
                    "name": "CompositionApiVsOptionsApi",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CompositionApiVsOptionsApi",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CompositionApiVsOptionsApi.vue')
                  },
                  {
                    "name": "CustomHooks",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomHooks",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/CustomHooks.vue')
                  },
                  {
                    "name": "VueDataWhyIsFunction",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueDataWhyIsFunction",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueDataWhyIsFunction.vue')
                  },
                  {
                    "name": "VuePlugin",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VuePlugin",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VuePlugin.vue')
                  },
                  {
                    "name": "RefAndReactiveDifference",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/RefAndReactiveDifference",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/RefAndReactiveDifference.vue')
                  },
                  {
                    "name": "VueCustomRenderer",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueCustomRenderer",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueCustomRenderer.vue')
                  },
                  {
                    "name": "KeepAliveAndCommonProblems",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/KeepAliveAndCommonProblems",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/KeepAliveAndCommonProblems.vue')
                  },
                  {
                    "name": "VuePermission",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VuePermission",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VuePermission.vue')
                  },
                  {
                    "name": "VueAsyncComponent",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueAsyncComponent",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueAsyncComponent.vue')
                  },
                  {
                    "name": "VueErrorProcess",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueErrorProcess",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueErrorProcess.vue')
                  },
                  {
                    "name": "VueObservable",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueObservable",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/VueObservable.vue')
                  },
                  {
                    "name": "TransitionAndTransitionGroup",
                    "path": "/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/TransitionAndTransitionGroup",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueBasicKnowledge/TransitionAndTransitionGroup.vue')
                  }
                ]
              },
              {
                "name": "VueUnderlyingPrinciples",
                "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples",
                "children": [
                  {
                    "name": "VuePrincipleOverview",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VuePrincipleOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VuePrincipleOverview.vue')
                  },
                  {
                    "name": "ReactivePrinciple",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ReactivePrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ReactivePrinciple.vue')
                  },
                  {
                    "name": "VueUpdateProcess",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueUpdateProcess",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueUpdateProcess.vue')
                  },
                  {
                    "name": "ProxyAndDefineProperty",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ProxyAndDefineProperty",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ProxyAndDefineProperty.vue')
                  },
                  {
                    "name": "VueDependencyCollection",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueDependencyCollection",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueDependencyCollection.vue')
                  },
                  {
                    "name": "VirtualDOM",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VirtualDOM",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VirtualDOM.vue')
                  },
                  {
                    "name": "Vue2DiffAlgorithm",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue2DiffAlgorithm",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue2DiffAlgorithm.vue')
                  },
                  {
                    "name": "Vue3DiffAlgorithm2",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue3DiffAlgorithm2",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue3DiffAlgorithm2.vue')
                  },
                  {
                    "name": "Vue2AndVue3DiffAlgorithmDifference",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue2AndVue3DiffAlgorithmDifference",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue2AndVue3DiffAlgorithmDifference.vue')
                  },
                  {
                    "name": "LongestIncreasingSubsequence",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/LongestIncreasingSubsequence",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/LongestIncreasingSubsequence.vue')
                  },
                  {
                    "name": "AsyncUpdate",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/AsyncUpdate",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/AsyncUpdate.vue')
                  },
                  {
                    "name": "VueScheduler",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueScheduler",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueScheduler.vue')
                  },
                  {
                    "name": "ComputedPrinciple",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ComputedPrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/ComputedPrinciple.vue')
                  },
                  {
                    "name": "WatchPrinciple",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/WatchPrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/WatchPrinciple.vue')
                  },
                  {
                    "name": "KeepAlivePrinciple",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/KeepAlivePrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/KeepAlivePrinciple.vue')
                  },
                  {
                    "name": "VifAndVforNotRecommended",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VifAndVforNotRecommended",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VifAndVforNotRecommended.vue')
                  },
                  {
                    "name": "Vue3SetupSyntaxSugar",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue3SetupSyntaxSugar",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/Vue3SetupSyntaxSugar.vue')
                  },
                  {
                    "name": "VueStyleScoped",
                    "path": "/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueStyleScoped",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueUnderlyingPrinciples/VueStyleScoped.vue')
                  }
                ]
              },
              {
                "name": "VuePerformanceOptimization",
                "path": "/front/FrameworksAndEngineering/Vue/VuePerformanceOptimization",
                "children": [
                  {
                    "name": "VuePerformanceOptimizationOverview",
                    "path": "/front/FrameworksAndEngineering/Vue/VuePerformanceOptimization/VuePerformanceOptimizationOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VuePerformanceOptimization/VuePerformanceOptimizationOverview.vue')
                  },
                  {
                    "name": "ListKey",
                    "path": "/front/FrameworksAndEngineering/Vue/VuePerformanceOptimization/ListKey",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VuePerformanceOptimization/ListKey.vue')
                  }
                ]
              },
              {
                "name": "Vue3Overview",
                "path": "/front/FrameworksAndEngineering/Vue/Vue3Overview",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/Vue3Overview.vue')
              },
              {
                "name": "Vue3AndVue2Difference",
                "path": "/front/FrameworksAndEngineering/Vue/Vue3AndVue2Difference",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/Vue3AndVue2Difference.vue')
              },
              {
                "name": "VueEcosystem",
                "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem",
                "children": [
                  {
                    "name": "VueRoute",
                    "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute",
                    "children": [
                      {
                        "name": "VueRouteUse",
                        "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRouteUse",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRouteUse.vue')
                      },
                      {
                        "name": "VueRouteGuard",
                        "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRouteGuard",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRouteGuard.vue')
                      },
                      {
                        "name": "VueRoutePrinciple",
                        "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRoutePrinciple",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/VueRoute/VueRoutePrinciple.vue')
                      }
                    ]
                  },
                  {
                    "name": "Pinia",
                    "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/Pinia",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/Pinia.vue')
                  },
                  {
                    "name": "Vuex",
                    "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/Vuex",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/Vuex.vue')
                  },
                  {
                    "name": "VueUIFramework",
                    "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueUIFramework",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/VueUIFramework.vue')
                  },
                  {
                    "name": "VueSSR",
                    "path": "/front/FrameworksAndEngineering/Vue/VueEcosystem/VueSSR",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueEcosystem/VueSSR.vue')
                  }
                ]
              },
              {
                "name": "HighFrequencyVue",
                "path": "/front/FrameworksAndEngineering/Vue/HighFrequencyVue",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/HighFrequencyVue.vue')
              },
              {
                "name": "VueProjectCodeStandard",
                "path": "/front/FrameworksAndEngineering/Vue/VueProjectCodeStandard",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VueProjectCodeStandard.vue')
              },
              {
                "name": "Vapor",
                "path": "/front/FrameworksAndEngineering/Vue/Vapor",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/Vapor.vue')
              },
              {
                "name": "VaporUpdatePrinciple",
                "path": "/front/FrameworksAndEngineering/Vue/VaporUpdatePrinciple",
                "component": () => import('@/views/front/FrameworksAndEngineering/Vue/VaporUpdatePrinciple.vue')
              }
            ]
          },
          {
            "name": "ReactVsVue",
            "path": "/front/FrameworksAndEngineering/ReactVsVue",
            "component": () => import('@/views/front/FrameworksAndEngineering/ReactVsVue.vue')
          },
          {
            "name": "Angular",
            "path": "/front/FrameworksAndEngineering/Angular",
            "component": () => import('@/views/front/FrameworksAndEngineering/Angular.vue')
          },
          {
            "name": "Svelte",
            "path": "/front/FrameworksAndEngineering/Svelte",
            "component": () => import('@/views/front/FrameworksAndEngineering/Svelte.vue')
          },
          {
            "name": "OtherFrontendFrameworks",
            "path": "/front/FrameworksAndEngineering/OtherFrontendFrameworks",
            "children": [
              {
                "name": "Solid",
                "path": "/front/FrameworksAndEngineering/OtherFrontendFrameworks/Solid",
                "component": () => import('@/views/front/FrameworksAndEngineering/OtherFrontendFrameworks/Solid.vue')
              },
              {
                "name": "Htmlxjs",
                "path": "/front/FrameworksAndEngineering/OtherFrontendFrameworks/Htmlxjs",
                "component": () => import('@/views/front/FrameworksAndEngineering/OtherFrontendFrameworks/Htmlxjs.vue')
              }
            ]
          },
          {
            "name": "FrontendFrameworkComparison",
            "path": "/front/FrameworksAndEngineering/FrontendFrameworkComparison",
            "component": () => import('@/views/front/FrameworksAndEngineering/FrontendFrameworkComparison.vue')
          },
          {
            "name": "SSRFramework",
            "path": "/front/FrameworksAndEngineering/SSRFramework",
            "children": [
              {
                "name": "SSRCSRSSGISR",
                "path": "/front/FrameworksAndEngineering/SSRFramework/SSRCSRSSGISR",
                "component": () => import('@/views/front/FrameworksAndEngineering/SSRFramework/SSRCSRSSGISR.vue')
              },
              {
                "name": "HydrationAndDehydration",
                "path": "/front/FrameworksAndEngineering/SSRFramework/HydrationAndDehydration",
                "component": () => import('@/views/front/FrameworksAndEngineering/SSRFramework/HydrationAndDehydration.vue')
              },
              {
                "name": "Nextjs",
                "path": "/front/FrameworksAndEngineering/SSRFramework/Nextjs",
                "component": () => import('@/views/front/FrameworksAndEngineering/SSRFramework/Nextjs.vue')
              },
              {
                "name": "Nuxt",
                "path": "/front/FrameworksAndEngineering/SSRFramework/Nuxt",
                "component": () => import('@/views/front/FrameworksAndEngineering/SSRFramework/Nuxt.vue')
              }
            ]
          },
          {
            "name": "Engineering",
            "path": "/front/FrameworksAndEngineering/Engineering",
            "children": [
              {
                "name": "BuildTools",
                "path": "/front/FrameworksAndEngineering/Engineering/BuildTools",
                "children": [
                  {
                    "name": "BuildToolsIntroduction",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/BuildToolsIntroduction",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/BuildToolsIntroduction.vue')
                  },
                  {
                    "name": "Webpack",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack",
                    "children": [
                      {
                        "name": "WebpackBasicKnowledge",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackBasicKnowledge",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackBasicKnowledge.vue')
                      },
                      {
                        "name": "WebpackConfiguration",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration",
                        "children": [
                          {
                            "name": "WebpackBasicConfiguration",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackBasicConfiguration",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackBasicConfiguration.vue')
                          },
                          {
                            "name": "WebpackEntry",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackEntry",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackEntry.vue')
                          },
                          {
                            "name": "WebpackOutput",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackOutput",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackOutput.vue')
                          },
                          {
                            "name": "WebpackExternals",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackExternals",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackExternals.vue')
                          },
                          {
                            "name": "WebpackDevServer",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackDevServer",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackDevServer.vue')
                          },
                          {
                            "name": "WebpackResolve",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackResolve",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackResolve.vue')
                          },
                          {
                            "name": "WebpackLibrary",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackLibrary",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackLibrary.vue')
                          },
                          {
                            "name": "WebpackCache",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackCache",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackConfiguration/WebpackCache.vue')
                          }
                        ]
                      },
                      {
                        "name": "WebpackLoader",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader",
                        "children": [
                          {
                            "name": "AssetModules",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/AssetModules",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/AssetModules.vue')
                          },
                          {
                            "name": "WebpackCommonLoader",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/WebpackCommonLoader",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/WebpackCommonLoader.vue')
                          },
                          {
                            "name": "OtherUsefulLoader",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/OtherUsefulLoader",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/OtherUsefulLoader.vue')
                          },
                          {
                            "name": "Babel",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel",
                            "children": [
                              {
                                "name": "BabelLoader",
                                "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelLoader",
                                "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelLoader.vue')
                              },
                              {
                                "name": "BabelRuntime",
                                "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelRuntime",
                                "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelRuntime.vue')
                              },
                              {
                                "name": "BabelPlugin",
                                "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelPlugin",
                                "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/Babel/BabelPlugin.vue')
                              }
                            ]
                          },
                          {
                            "name": "HowToImplementALoader",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/HowToImplementALoader",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackLoader/HowToImplementALoader.vue')
                          }
                        ]
                      },
                      {
                        "name": "WebpackPlugin",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin",
                        "children": [
                          {
                            "name": "WebpackCommonPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/WebpackCommonPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/WebpackCommonPlugin.vue')
                          },
                          {
                            "name": "TerserWebpackPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/TerserWebpackPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/TerserWebpackPlugin.vue')
                          },
                          {
                            "name": "CompressionWebpackPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/CompressionWebpackPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/CompressionWebpackPlugin.vue')
                          },
                          {
                            "name": "BundleAnalyzerPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/BundleAnalyzerPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/BundleAnalyzerPlugin.vue')
                          },
                          {
                            "name": "ProvidePlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ProvidePlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ProvidePlugin.vue')
                          },
                          {
                            "name": "WorkboxWebpackPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/WorkboxWebpackPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/WorkboxWebpackPlugin.vue')
                          },
                          {
                            "name": "DllPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/DllPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/DllPlugin.vue')
                          },
                          {
                            "name": "ModuleFederationPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ModuleFederationPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ModuleFederationPlugin.vue')
                          },
                          {
                            "name": "ModuleFederation1",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ModuleFederation1",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/ModuleFederation1.vue')
                          },
                          {
                            "name": "HowToImplementAPlugin",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/HowToImplementAPlugin",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackPlugin/HowToImplementAPlugin.vue')
                          }
                        ]
                      },
                      {
                        "name": "LoaderAndPluginDifference",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/LoaderAndPluginDifference",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/LoaderAndPluginDifference.vue')
                      },
                      {
                        "name": "WebpackSourceMap",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackSourceMap",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackSourceMap.vue')
                      },
                      {
                        "name": "WebpackOptimization",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization",
                        "children": [
                          {
                            "name": "WebpackOptimizationConfiguration",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackOptimizationConfiguration",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackOptimizationConfiguration.vue')
                          },
                          {
                            "name": "WebpackPerformanceOptimization",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackPerformanceOptimization",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackPerformanceOptimization.vue')
                          },
                          {
                            "name": "WebpackCodeSeparation",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackCodeSeparation",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackCodeSeparation.vue')
                          },
                          {
                            "name": "SplitChunks",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/SplitChunks",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/SplitChunks.vue')
                          },
                          {
                            "name": "WebpackBuildPerformanceOptimization",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackBuildPerformanceOptimization",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackOptimization/WebpackBuildPerformanceOptimization.vue')
                          }
                        ]
                      },
                      {
                        "name": "WebpackUnderlyingPrinciples",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples",
                        "children": [
                          {
                            "name": "WebpackImplementationIdea",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/WebpackImplementationIdea",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/WebpackImplementationIdea.vue')
                          },
                          {
                            "name": "Tapable",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/Tapable",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/Tapable.vue')
                          },
                          {
                            "name": "HotUpdate",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/HotUpdate",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/HotUpdate.vue')
                          },
                          {
                            "name": "SourceMap",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/SourceMap",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/SourceMap.vue')
                          },
                          {
                            "name": "TreeShaking2",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/TreeShaking2",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/TreeShaking2.vue')
                          },
                          {
                            "name": "ContentHash",
                            "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/ContentHash",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackUnderlyingPrinciples/ContentHash.vue')
                          }
                        ]
                      },
                      {
                        "name": "WebpackHighFrequencyIssues",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackHighFrequencyIssues",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Webpack/WebpackHighFrequencyIssues.vue')
                      }
                    ]
                  },
                  {
                    "name": "Vite",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Vite",
                    "children": [
                      {
                        "name": "ViteBasicKnowledge",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteBasicKnowledge",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteBasicKnowledge.vue')
                      },
                      {
                        "name": "ViteConfiguration",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteConfiguration",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteConfiguration.vue')
                      },
                      {
                        "name": "ViteOptimization",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteOptimization",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteOptimization.vue')
                      },
                      {
                        "name": "ViteUnderlyingPrinciples",
                        "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteUnderlyingPrinciples",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Vite/ViteUnderlyingPrinciples.vue')
                      }
                    ]
                  },
                  {
                    "name": "WebpackAndViteDifference",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/WebpackAndViteDifference",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/WebpackAndViteDifference.vue')
                  },
                  {
                    "name": "ESBuild",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/ESBuild",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/ESBuild.vue')
                  },
                  {
                    "name": "Rollup",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Rollup",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Rollup.vue')
                  },
                  {
                    "name": "Gulp",
                    "path": "/front/FrameworksAndEngineering/Engineering/BuildTools/Gulp",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/BuildTools/Gulp.vue')
                  }
                ]
              },
              {
                "name": "CodeStandards",
                "path": "/front/FrameworksAndEngineering/Engineering/CodeStandards",
                "children": [
                  {
                    "name": "ESLint",
                    "path": "/front/FrameworksAndEngineering/Engineering/CodeStandards/ESLint",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CodeStandards/ESLint.vue')
                  },
                  {
                    "name": "Prettier",
                    "path": "/front/FrameworksAndEngineering/Engineering/CodeStandards/Prettier",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CodeStandards/Prettier.vue')
                  },
                  {
                    "name": "Husky",
                    "path": "/front/FrameworksAndEngineering/Engineering/CodeStandards/Husky",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CodeStandards/Husky.vue')
                  },
                  {
                    "name": "HuskyConfiguration",
                    "path": "/front/FrameworksAndEngineering/Engineering/CodeStandards/HuskyConfiguration",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CodeStandards/HuskyConfiguration.vue')
                  }
                ]
              },
              {
                "name": "Monorepo",
                "path": "/front/FrameworksAndEngineering/Engineering/Monorepo",
                "children": [
                  {
                    "name": "MonorepoIntroduction",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/MonorepoIntroduction",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/MonorepoIntroduction.vue')
                  },
                  {
                    "name": "Workspace",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace",
                    "children": [
                      {
                        "name": "WorkspaceIntroduction",
                        "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/WorkspaceIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/WorkspaceIntroduction.vue')
                      },
                      {
                        "name": "WorkspaceConfiguration",
                        "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/WorkspaceConfiguration",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/WorkspaceConfiguration.vue')
                      },
                      {
                        "name": "PnpmWorkspaceYaml",
                        "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/PnpmWorkspaceYaml",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/Workspace/PnpmWorkspaceYaml.vue')
                      }
                    ]
                  },
                  {
                    "name": "Turborepo",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Turborepo",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/Turborepo.vue')
                  },
                  {
                    "name": "TurborepoConfiguration",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/TurborepoConfiguration",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/TurborepoConfiguration.vue')
                  },
                  {
                    "name": "Lerna",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/Lerna",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/Lerna.vue')
                  },
                  {
                    "name": "rush",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/rush",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/rush.vue')
                  },
                  {
                    "name": "MonorepoToolsComparison",
                    "path": "/front/FrameworksAndEngineering/Engineering/Monorepo/MonorepoToolsComparison",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Monorepo/MonorepoToolsComparison.vue')
                  }
                ]
              },
              {
                "name": "MicroFront",
                "path": "/front/FrameworksAndEngineering/Engineering/MicroFront",
                "children": [
                  {
                    "name": "MicroFrontImplementation",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/MicroFrontImplementation",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/MicroFrontImplementation.vue')
                  },
                  {
                    "name": "MicroFrontLibrary",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/MicroFrontLibrary",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/MicroFrontLibrary.vue')
                  },
                  {
                    "name": "IframeSandbox",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/IframeSandbox",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/IframeSandbox.vue')
                  },
                  {
                    "name": "WebComponent",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/WebComponent",
                    "children": [
                      {
                        "name": "WebComponentIntroduction",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/WebComponent/WebComponentIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/WebComponent/WebComponentIntroduction.vue')
                      },
                      {
                        "name": "WebComponentAdvanced",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/WebComponent/WebComponentAdvanced",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/WebComponent/WebComponentAdvanced.vue')
                      }
                    ]
                  },
                  {
                    "name": "ModuleFederation",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/ModuleFederation",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/ModuleFederation.vue')
                  },
                  {
                    "name": "ModuleFederationPrinciple",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/ModuleFederationPrinciple",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/ModuleFederationPrinciple.vue')
                  },
                  {
                    "name": "QianKun",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun",
                    "children": [
                      {
                        "name": "QianKunIntroduction",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/QianKunIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/QianKunIntroduction.vue')
                      },
                      {
                        "name": "QianKunPrinciple",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/QianKunPrinciple",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/QianKunPrinciple.vue')
                      },
                      {
                        "name": "ImportHtmlEntry",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/ImportHtmlEntry",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/ImportHtmlEntry.vue')
                      },
                      {
                        "name": "ViteAndQianKun",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/ViteAndQianKun",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/QianKun/ViteAndQianKun.vue')
                      }
                    ]
                  },
                  {
                    "name": "Sandbox",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox",
                    "children": [
                      {
                        "name": "SandboxIntroduction",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxIntroduction.vue')
                      },
                      {
                        "name": "SandboxLibrary",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxLibrary",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxLibrary.vue')
                      },
                      {
                        "name": "SandboxImplementation",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxImplementation",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxImplementation.vue')
                      },
                      {
                        "name": "SandboxEscape",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxEscape",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/SandboxEscape.vue')
                      },
                      {
                        "name": "CSSIsolationImplementation",
                        "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/CSSIsolationImplementation",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/Sandbox/CSSIsolationImplementation.vue')
                      }
                    ]
                  },
                  {
                    "name": "OtherMicroFront",
                    "path": "/front/FrameworksAndEngineering/Engineering/MicroFront/OtherMicroFront",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/MicroFront/OtherMicroFront.vue')
                  }
                ]
              },
              {
                "name": "Testing",
                "path": "/front/FrameworksAndEngineering/Engineering/Testing",
                "children": [
                  {
                    "name": "FrontendTestingOverview",
                    "path": "/front/FrameworksAndEngineering/Engineering/Testing/FrontendTestingOverview",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/FrontendTestingOverview.vue')
                  },
                  {
                    "name": "FrontendTestingBenefitsAndDrawbacks",
                    "path": "/front/FrameworksAndEngineering/Engineering/Testing/FrontendTestingBenefitsAndDrawbacks",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/FrontendTestingBenefitsAndDrawbacks.vue')
                  },
                  {
                    "name": "UnitTesting",
                    "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting",
                    "children": [
                      {
                        "name": "UnitTestingIntroduction",
                        "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/UnitTestingIntroduction",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/UnitTestingIntroduction.vue')
                      },
                      {
                        "name": "Jest",
                        "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Jest",
                        "children": [
                          {
                            "name": "JestBasicKnowledge",
                            "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Jest/JestBasicKnowledge",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Jest/JestBasicKnowledge.vue')
                          },
                          {
                            "name": "JestApi",
                            "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Jest/JestApi",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Jest/JestApi.vue')
                          }
                        ]
                      },
                      {
                        "name": "Vitest",
                        "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Vitest",
                        "children": [
                          {
                            "name": "VitestBasicKnowledge",
                            "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Vitest/VitestBasicKnowledge",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Vitest/VitestBasicKnowledge.vue')
                          },
                          {
                            "name": "VitestApi",
                            "path": "/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Vitest/VitestApi",
                            "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/UnitTesting/Vitest/VitestApi.vue')
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "IntegrationTesting",
                    "path": "/front/FrameworksAndEngineering/Engineering/Testing/IntegrationTesting",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/IntegrationTesting.vue')
                  },
                  {
                    "name": "EndToEndTesting",
                    "path": "/front/FrameworksAndEngineering/Engineering/Testing/EndToEndTesting",
                    "children": [
                      {
                        "name": "Cypress",
                        "path": "/front/FrameworksAndEngineering/Engineering/Testing/EndToEndTesting/Cypress",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/Testing/EndToEndTesting/Cypress.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "InterfaceDebugging",
                "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging",
                "children": [
                  {
                    "name": "InterfaceDocumentation",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/InterfaceDocumentation",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/InterfaceDocumentation.vue')
                  },
                  {
                    "name": "InterfaceDebuggingToolsComparison",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/InterfaceDebuggingToolsComparison",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/InterfaceDebuggingToolsComparison.vue')
                  },
                  {
                    "name": "Postman",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Postman",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Postman.vue')
                  },
                  {
                    "name": "ApiFox",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/ApiFox",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/ApiFox.vue')
                  },
                  {
                    "name": "Swagger",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Swagger",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Swagger.vue')
                  },
                  {
                    "name": "Mock",
                    "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock",
                    "children": [
                      {
                        "name": "MockToolsComparison",
                        "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MockToolsComparison",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MockToolsComparison.vue')
                      },
                      {
                        "name": "MockJs",
                        "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MockJs",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MockJs.vue')
                      },
                      {
                        "name": "MSW",
                        "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MSW",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/MSW.vue')
                      },
                      {
                        "name": "JSONServer",
                        "path": "/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/JSONServer",
                        "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/InterfaceDebugging/Mock/JSONServer.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "CIAndCD",
                "path": "/front/FrameworksAndEngineering/Engineering/CIAndCD",
                "children": [
                  {
                    "name": "CIAndCDIntroduction",
                    "path": "/front/FrameworksAndEngineering/Engineering/CIAndCD/CIAndCDIntroduction",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CIAndCD/CIAndCDIntroduction.vue')
                  },
                  {
                    "name": "Gitlab",
                    "path": "/front/FrameworksAndEngineering/Engineering/CIAndCD/Gitlab",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CIAndCD/Gitlab.vue')
                  },
                  {
                    "name": "Jenkins",
                    "path": "/front/FrameworksAndEngineering/Engineering/CIAndCD/Jenkins",
                    "component": () => import('@/views/front/FrameworksAndEngineering/Engineering/CIAndCD/Jenkins.vue')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "AdvancedSkills",
        "path": "/front/AdvancedSkills",
        "children": [
          {
            "name": "GraphicRelated",
            "path": "/front/AdvancedSkills/GraphicRelated",
            "children": [
              {
                "name": "Canvas2",
                "path": "/front/AdvancedSkills/GraphicRelated/Canvas2",
                "children": [
                  {
                    "name": "CanvasBase",
                    "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase",
                    "children": [
                      {
                        "name": "CanvasIntroduction",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasIntroduction",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasIntroduction.vue')
                      },
                      {
                        "name": "CanvasAPI",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasAPI",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasAPI.vue')
                      },
                      {
                        "name": "CanvasBaseShape",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasBaseShape",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasBaseShape.vue')
                      },
                      {
                        "name": "CanvasBezierCurve",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasBezierCurve",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasBezierCurve.vue')
                      },
                      {
                        "name": "CanvasSaveAndRestore",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasSaveAndRestore",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasBase/CanvasSaveAndRestore.vue')
                      }
                    ]
                  },
                  {
                    "name": "CanvasAdvanced",
                    "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced",
                    "children": [
                      {
                        "name": "DigitalImageProcessing",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/DigitalImageProcessing",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/DigitalImageProcessing.vue')
                      },
                      {
                        "name": "ImageRecognition",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/ImageRecognition",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/ImageRecognition.vue')
                      },
                      {
                        "name": "DigitalDrawShape",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/DigitalDrawShape",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/DigitalDrawShape.vue')
                      },
                      {
                        "name": "CanvasEventHandling",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/CanvasEventHandling",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasAdvanced/CanvasEventHandling.vue')
                      }
                    ]
                  },
                  {
                    "name": "CanvasLibrary",
                    "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary",
                    "children": [
                      {
                        "name": "WebGL",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL",
                        "children": [
                          {
                            "name": "WebGLBase",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLBase",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLBase.vue')
                          },
                          {
                            "name": "WebGLLearningRoadmap",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLLearningRoadmap",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLLearningRoadmap.vue')
                          },
                          {
                            "name": "WebGLRenderProcess",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLRenderProcess",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLRenderProcess.vue')
                          },
                          {
                            "name": "WebGLVertexShader",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLVertexShader",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLVertexShader.vue')
                          },
                          {
                            "name": "WebGLFragmentShader",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLFragmentShader",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLFragmentShader.vue')
                          },
                          {
                            "name": "WebGLTexture",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLTexture",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLTexture.vue')
                          },
                          {
                            "name": "WebGLBuffer",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLBuffer",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLBuffer.vue')
                          },
                          {
                            "name": "WebGLFrameBuffer",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLFrameBuffer",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/WebGL/WebGLFrameBuffer.vue')
                          }
                        ]
                      },
                      {
                        "name": "Echarts",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/Echarts",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/Echarts.vue')
                      },
                      {
                        "name": "ThreeJs",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs",
                        "children": [
                          {
                            "name": "ThreeJsIntroduction",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsIntroduction",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsIntroduction.vue')
                          },
                          {
                            "name": "ThreeJsBase",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsBase",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsBase.vue')
                          },
                          {
                            "name": "ThreeJsLearningRoadmap",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsLearningRoadmap",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsLearningRoadmap.vue')
                          },
                          {
                            "name": "ThreeJsBaseThreeElements",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsBaseThreeElements",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsBaseThreeElements.vue')
                          },
                          {
                            "name": "ThreeJsCamera",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsCamera",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsCamera.vue')
                          },
                          {
                            "name": "ThreeJsScene",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsScene",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsScene.vue')
                          },
                          {
                            "name": "ThreeJsMesh",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsMesh",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsMesh.vue')
                          },
                          {
                            "name": "ThreeJsOrbitControls",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsOrbitControls",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsOrbitControls.vue')
                          },
                          {
                            "name": "ThreeJsMaterial",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsMaterial",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsMaterial.vue')
                          },
                          {
                            "name": "ThreeJsTexture",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsTexture",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsTexture.vue')
                          },
                          {
                            "name": "ThreeJsSticker",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsSticker",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsSticker.vue')
                          },
                          {
                            "name": "ThreeJsLight",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsLight",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsLight.vue')
                          },
                          {
                            "name": "ThreeJsShadow",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsShadow",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsShadow.vue')
                          },
                          {
                            "name": "ThreeJsAntialiasing",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsAntialiasing",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsAntialiasing.vue')
                          },
                          {
                            "name": "ThreeJsPerformanceOptimization",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsPerformanceOptimization",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/ThreeJs/ThreeJsPerformanceOptimization.vue')
                          }
                        ]
                      },
                      {
                        "name": "BabylonJs",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/BabylonJs",
                        "children": [
                          {
                            "name": "BabylonJsIntroduction",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/BabylonJs/BabylonJsIntroduction",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/BabylonJs/BabylonJsIntroduction.vue')
                          },
                          {
                            "name": "BabylonJsBase",
                            "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/BabylonJs/BabylonJsBase",
                            "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/BabylonJs/BabylonJsBase.vue')
                          }
                        ]
                      },
                      {
                        "name": "G6",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/G6",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/G6.vue')
                      },
                      {
                        "name": "FabricJs",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/FabricJs",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/FabricJs.vue')
                      },
                      {
                        "name": "Konva",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/Konva",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/Konva.vue')
                      },
                      {
                        "name": "D3js",
                        "path": "/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/D3js",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/Canvas2/CanvasLibrary/D3js.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "SvgOpearation",
                "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation",
                "children": [
                  {
                    "name": "SvgIntroduction",
                    "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgIntroduction",
                    "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgIntroduction.vue')
                  },
                  {
                    "name": "SvgBase",
                    "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase",
                    "children": [
                      {
                        "name": "SvgBaseShape",
                        "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgBaseShape",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgBaseShape.vue')
                      },
                      {
                        "name": "SvgPath",
                        "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgPath",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgPath.vue')
                      },
                      {
                        "name": "FillAndStroke",
                        "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/FillAndStroke",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/FillAndStroke.vue')
                      },
                      {
                        "name": "DefineAndUse",
                        "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/DefineAndUse",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/DefineAndUse.vue')
                      },
                      {
                        "name": "SvgElementTable",
                        "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgElementTable",
                        "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgBase/SvgElementTable.vue')
                      }
                    ]
                  },
                  {
                    "name": "SvgLibrary",
                    "path": "/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgLibrary",
                    "component": () => import('@/views/front/AdvancedSkills/GraphicRelated/SvgOpearation/SvgLibrary.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "AnimationRelated",
            "path": "/front/AdvancedSkills/AnimationRelated",
            "children": [
              {
                "name": "CSSAnimationVsJSAnimation",
                "path": "/front/AdvancedSkills/AnimationRelated/CSSAnimationVsJSAnimation",
                "component": () => import('@/views/front/AdvancedSkills/AnimationRelated/CSSAnimationVsJSAnimation.vue')
              },
              {
                "name": "AnimationLibrary",
                "path": "/front/AdvancedSkills/AnimationRelated/AnimationLibrary",
                "children": [
                  {
                    "name": "GASP",
                    "path": "/front/AdvancedSkills/AnimationRelated/AnimationLibrary/GASP",
                    "component": () => import('@/views/front/AdvancedSkills/AnimationRelated/AnimationLibrary/GASP.vue')
                  },
                  {
                    "name": "Motion",
                    "path": "/front/AdvancedSkills/AnimationRelated/AnimationLibrary/Motion",
                    "component": () => import('@/views/front/AdvancedSkills/AnimationRelated/AnimationLibrary/Motion.vue')
                  },
                  {
                    "name": "AnimeJs",
                    "path": "/front/AdvancedSkills/AnimationRelated/AnimationLibrary/AnimeJs",
                    "component": () => import('@/views/front/AdvancedSkills/AnimationRelated/AnimationLibrary/AnimeJs.vue')
                  },
                  {
                    "name": "MatterJs",
                    "path": "/front/AdvancedSkills/AnimationRelated/AnimationLibrary/MatterJs",
                    "component": () => import('@/views/front/AdvancedSkills/AnimationRelated/AnimationLibrary/MatterJs.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "FrontendSecurity",
            "path": "/front/AdvancedSkills/FrontendSecurity",
            "children": [
              {
                "name": "SecurityOverview",
                "path": "/front/AdvancedSkills/FrontendSecurity/SecurityOverview",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/SecurityOverview.vue')
              },
              {
                "name": "XSS",
                "path": "/front/AdvancedSkills/FrontendSecurity/XSS",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/XSS.vue')
              },
              {
                "name": "CSRF",
                "path": "/front/AdvancedSkills/FrontendSecurity/CSRF",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/CSRF.vue')
              },
              {
                "name": "CSP",
                "path": "/front/AdvancedSkills/FrontendSecurity/CSP",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/CSP.vue')
              },
              {
                "name": "SQLInjection",
                "path": "/front/AdvancedSkills/FrontendSecurity/SQLInjection",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/SQLInjection.vue')
              },
              {
                "name": "ClickJacking",
                "path": "/front/AdvancedSkills/FrontendSecurity/ClickJacking",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/ClickJacking.vue')
              },
              {
                "name": "ManInTheMiddleAttack",
                "path": "/front/AdvancedSkills/FrontendSecurity/ManInTheMiddleAttack",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/ManInTheMiddleAttack.vue')
              },
              {
                "name": "DependencyExploitation",
                "path": "/front/AdvancedSkills/FrontendSecurity/DependencyExploitation",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/DependencyExploitation.vue')
              },
              {
                "name": "DenialOfServiceAttack",
                "path": "/front/AdvancedSkills/FrontendSecurity/DenialOfServiceAttack",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/DenialOfServiceAttack.vue')
              },
              {
                "name": "integrity",
                "path": "/front/AdvancedSkills/FrontendSecurity/integrity",
                "component": () => import('@/views/front/AdvancedSkills/FrontendSecurity/integrity.vue')
              }
            ]
          },
          {
            "name": "NewTechnology",
            "path": "/front/AdvancedSkills/NewTechnology",
            "children": [
              {
                "name": "NewTechnologyList",
                "path": "/front/AdvancedSkills/NewTechnology/NewTechnologyList",
                "component": () => import('@/views/front/AdvancedSkills/NewTechnology/NewTechnologyList.vue')
              },
              {
                "name": "WebGPU",
                "path": "/front/AdvancedSkills/NewTechnology/WebGPU",
                "children": [
                  {
                    "name": "WebGPUIntroduction",
                    "path": "/front/AdvancedSkills/NewTechnology/WebGPU/WebGPUIntroduction",
                    "component": () => import('@/views/front/AdvancedSkills/NewTechnology/WebGPU/WebGPUIntroduction.vue')
                  }
                ]
              },
              {
                "name": "WebAssembly1",
                "path": "/front/AdvancedSkills/NewTechnology/WebAssembly1",
                "component": () => import('@/views/front/AdvancedSkills/NewTechnology/WebAssembly1.vue')
              },
              {
                "name": "WebRTC",
                "path": "/front/AdvancedSkills/NewTechnology/WebRTC",
                "component": () => import('@/views/front/AdvancedSkills/NewTechnology/WebRTC.vue')
              }
            ]
          },
          {
            "name": "OtherEnd",
            "path": "/front/AdvancedSkills/OtherEnd",
            "children": [
              {
                "name": "PWA",
                "path": "/front/AdvancedSkills/OtherEnd/PWA",
                "component": () => import('@/views/front/AdvancedSkills/OtherEnd/PWA.vue')
              },
              {
                "name": "MobileEnd",
                "path": "/front/AdvancedSkills/OtherEnd/MobileEnd",
                "children": [
                  {
                    "name": "MobileHtml5Adaptation",
                    "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MobileHtml5Adaptation",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/MobileHtml5Adaptation.vue')
                  },
                  {
                    "name": "UniApp",
                    "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/UniApp",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/UniApp.vue')
                  },
                  {
                    "name": "Flutter",
                    "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/Flutter",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/Flutter.vue')
                  },
                  {
                    "name": "MiniProgram",
                    "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram",
                    "children": [
                      {
                        "name": "MiniProgramBasicKnowledge",
                        "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/MiniProgramBasicKnowledge",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/MiniProgramBasicKnowledge.vue')
                      },
                      {
                        "name": "WeChatCommonComponents",
                        "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatCommonComponents",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatCommonComponents.vue')
                      },
                      {
                        "name": "WeChatCommonAPI",
                        "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatCommonAPI",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatCommonAPI.vue')
                      },
                      {
                        "name": "WeChatHighOrderComponentsAndAPI",
                        "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatHighOrderComponentsAndAPI",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/MiniProgram/WeChatHighOrderComponentsAndAPI.vue')
                      }
                    ]
                  },
                  {
                    "name": "Arkjs",
                    "path": "/front/AdvancedSkills/OtherEnd/MobileEnd/Arkjs",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/MobileEnd/Arkjs.vue')
                  }
                ]
              },
              {
                "name": "DesktopEnd",
                "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd",
                "children": [
                  {
                    "name": "DesktopFrameworkComparison",
                    "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/DesktopFrameworkComparison",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/DesktopFrameworkComparison.vue')
                  },
                  {
                    "name": "Electron",
                    "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron",
                    "children": [
                      {
                        "name": "CoreConcepts",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/CoreConcepts",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/CoreConcepts.vue')
                      },
                      {
                        "name": "CoreFeaturesAndInterfaces",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/CoreFeaturesAndInterfaces",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/CoreFeaturesAndInterfaces.vue')
                      },
                      {
                        "name": "ElectronLifeCycle",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/ElectronLifeCycle",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/ElectronLifeCycle.vue')
                      },
                      {
                        "name": "NativeAPI",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/NativeAPI",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/NativeAPI.vue')
                      },
                      {
                        "name": "IPC",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/IPC",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/IPC.vue')
                      },
                      {
                        "name": "ElectronPerformanceOptimization",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/ElectronPerformanceOptimization",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/ElectronPerformanceOptimization.vue')
                      },
                      {
                        "name": "RelatedEcosystemAndTools",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/RelatedEcosystemAndTools",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/RelatedEcosystemAndTools.vue')
                      },
                      {
                        "name": "PackagingAndPublishing",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/PackagingAndPublishing",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/PackagingAndPublishing.vue')
                      },
                      {
                        "name": "Security",
                        "path": "/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/Security",
                        "component": () => import('@/views/front/AdvancedSkills/OtherEnd/DesktopEnd/Electron/Security.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "LinuxSystem",
                "path": "/front/AdvancedSkills/OtherEnd/LinuxSystem",
                "children": [
                  {
                    "name": "LinuxBasicIntroduction",
                    "path": "/front/AdvancedSkills/OtherEnd/LinuxSystem/LinuxBasicIntroduction",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/LinuxSystem/LinuxBasicIntroduction.vue')
                  },
                  {
                    "name": "LinuxCommandOverview",
                    "path": "/front/AdvancedSkills/OtherEnd/LinuxSystem/LinuxCommandOverview",
                    "component": () => import('@/views/front/AdvancedSkills/OtherEnd/LinuxSystem/LinuxCommandOverview.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "AudioAndVideoProcessing",
            "path": "/front/AdvancedSkills/AudioAndVideoProcessing",
            "component": () => import('@/views/front/AdvancedSkills/AudioAndVideoProcessing.vue')
          },
          {
            "name": "OtherLanguage",
            "path": "/front/AdvancedSkills/OtherLanguage",
            "component": () => import('@/views/front/AdvancedSkills/OtherLanguage.vue')
          }
        ]
      },
      {
        "name": "ProjectsAndSoftSkills",
        "path": "/front/ProjectsAndSoftSkills",
        "children": [
          {
            "name": "businessAndImplementation",
            "path": "/front/ProjectsAndSoftSkills/businessAndImplementation",
            "children": [
              {
                "name": "UserOperation",
                "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation",
                "children": [
                  {
                    "name": "FullSiteSearch",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/FullSiteSearch",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/FullSiteSearch.vue')
                  },
                  {
                    "name": "QRCodeLogin",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/QRCodeLogin",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/QRCodeLogin.vue')
                  },
                  {
                    "name": "SingleSignOn",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/SingleSignOn",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/SingleSignOn.vue')
                  },
                  {
                    "name": "Accessibility",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/Accessibility",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/Accessibility.vue')
                  },
                  {
                    "name": "NotifyUserRefresh",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/NotifyUserRefresh",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/NotifyUserRefresh.vue')
                  },
                  {
                    "name": "FilePreview",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/FilePreview",
                    "children": [
                      {
                        "name": "ImagePreview",
                        "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/FilePreview/ImagePreview",
                        "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/UserOperation/FilePreview/ImagePreview.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "DataRelated2",
                "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2",
                "children": [
                  {
                    "name": "RequestLargeScaleConcurrentProcessing",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/RequestLargeScaleConcurrentProcessing",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/RequestLargeScaleConcurrentProcessing.vue')
                  },
                  {
                    "name": "LargeFileUpload",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/LargeFileUpload",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/LargeFileUpload.vue')
                  },
                  {
                    "name": "Screenshot",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/Screenshot",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/Screenshot.vue')
                  },
                  {
                    "name": "DataCollection",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/DataCollection",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/DataRelated2/DataCollection.vue')
                  }
                ]
              },
              {
                "name": "AdaptationRelated",
                "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/AdaptationRelated",
                "children": [
                  {
                    "name": "MobileAdaptation2",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/AdaptationRelated/MobileAdaptation2",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/AdaptationRelated/MobileAdaptation2.vue')
                  },
                  {
                    "name": "WebsiteLanguageScheme",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/AdaptationRelated/WebsiteLanguageScheme",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/AdaptationRelated/WebsiteLanguageScheme.vue')
                  }
                ]
              },
              {
                "name": "Monitoring",
                "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/Monitoring",
                "children": [
                  {
                    "name": "PerformanceMonitoring",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/Monitoring/PerformanceMonitoring",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/Monitoring/PerformanceMonitoring.vue')
                  }
                ]
              },
              {
                "name": "ProjectRelated",
                "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated",
                "children": [
                  {
                    "name": "SeoAndOptimization2",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/SeoAndOptimization2",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/SeoAndOptimization2.vue')
                  },
                  {
                    "name": "ProjectReuse",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/ProjectReuse",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/ProjectReuse.vue')
                  },
                  {
                    "name": "InterfaceAutoGenerateTypeFile",
                    "path": "/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/InterfaceAutoGenerateTypeFile",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/businessAndImplementation/ProjectRelated/InterfaceAutoGenerateTypeFile.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "ProjectOrganization",
            "path": "/front/ProjectsAndSoftSkills/ProjectOrganization",
            "children": [
              {
                "name": "STAR",
                "path": "/front/ProjectsAndSoftSkills/ProjectOrganization/STAR",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ProjectOrganization/STAR.vue')
              },
              {
                "name": "TechnicalChallenges",
                "path": "/front/ProjectsAndSoftSkills/ProjectOrganization/TechnicalChallenges",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ProjectOrganization/TechnicalChallenges.vue')
              },
              {
                "name": "Reflection",
                "path": "/front/ProjectsAndSoftSkills/ProjectOrganization/Reflection",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ProjectOrganization/Reflection.vue')
              }
            ]
          },
          {
            "name": "TechTrends",
            "path": "/front/ProjectsAndSoftSkills/TechTrends",
            "children": [
              {
                "name": "WebAssembly",
                "path": "/front/ProjectsAndSoftSkills/TechTrends/WebAssembly",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/WebAssembly.vue')
              },
              {
                "name": "LessCode",
                "path": "/front/ProjectsAndSoftSkills/TechTrends/LessCode",
                "children": [
                  {
                    "name": "LowCodeIntroduction",
                    "path": "/front/ProjectsAndSoftSkills/TechTrends/LessCode/LowCodeIntroduction",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/LessCode/LowCodeIntroduction.vue')
                  },
                  {
                    "name": "LowCodePlatform",
                    "path": "/front/ProjectsAndSoftSkills/TechTrends/LessCode/LowCodePlatform",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/LessCode/LowCodePlatform.vue')
                  },
                  {
                    "name": "ReTool",
                    "path": "/front/ProjectsAndSoftSkills/TechTrends/LessCode/ReTool",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/LessCode/ReTool.vue')
                  },
                  {
                    "name": "NoCode",
                    "path": "/front/ProjectsAndSoftSkills/TechTrends/LessCode/NoCode",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/LessCode/NoCode.vue')
                  }
                ]
              },
              {
                "name": "FormDesigner",
                "path": "/front/ProjectsAndSoftSkills/TechTrends/FormDesigner",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/TechTrends/FormDesigner.vue')
              }
            ]
          },
          {
            "name": "TeamInfrastructure",
            "path": "/front/ProjectsAndSoftSkills/TeamInfrastructure",
            "component": () => import('@/views/front/ProjectsAndSoftSkills/TeamInfrastructure.vue')
          },
          {
            "name": "ToolCompile",
            "path": "/front/ProjectsAndSoftSkills/ToolCompile",
            "children": [
              {
                "name": "CodeGenerator",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/CodeGenerator",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/CodeGenerator.vue')
              },
              {
                "name": "SubResourceIntegrityPlugin",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/SubResourceIntegrityPlugin",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/SubResourceIntegrityPlugin.vue')
              },
              {
                "name": "ProjectGenerator",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/ProjectGenerator",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/ProjectGenerator.vue')
              },
              {
                "name": "InternationalizationAutoTool",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/InternationalizationAutoTool",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/InternationalizationAutoTool.vue')
              },
              {
                "name": "HtmlCodeCommenter",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/HtmlCodeCommenter",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/HtmlCodeCommenter.vue')
              },
              {
                "name": "IncrementalGenerator",
                "path": "/front/ProjectsAndSoftSkills/ToolCompile/IncrementalGenerator",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/ToolCompile/IncrementalGenerator.vue')
              }
            ]
          },
          {
            "name": "TechnicalDifficulties",
            "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties",
            "children": [
              {
                "name": "FrameworkAspect",
                "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties/FrameworkAspect",
                "children": [
                  {
                    "name": "FrameworkAspect1",
                    "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties/FrameworkAspect/FrameworkAspect1",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/TechnicalDifficulties/FrameworkAspect/FrameworkAspect1.vue')
                  }
                ]
              },
              {
                "name": "TechnicalDifficultiesList",
                "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties/TechnicalDifficultiesList",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/TechnicalDifficulties/TechnicalDifficultiesList.vue')
              },
              {
                "name": "TreeComponentRendering",
                "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties/TreeComponentRendering",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/TechnicalDifficulties/TreeComponentRendering.vue')
              },
              {
                "name": "AsyncScroll",
                "path": "/front/ProjectsAndSoftSkills/TechnicalDifficulties/AsyncScroll",
                "component": () => import('@/views/front/ProjectsAndSoftSkills/TechnicalDifficulties/AsyncScroll.vue')
              }
            ]
          },
          {
            "name": "SomePitfalls",
            "path": "/front/ProjectsAndSoftSkills/SomePitfalls",
            "children": [
              {
                "name": "JsNative",
                "path": "/front/ProjectsAndSoftSkills/SomePitfalls/JsNative",
                "children": [
                  {
                    "name": "ReferenceTypesPitFalls",
                    "path": "/front/ProjectsAndSoftSkills/SomePitfalls/JsNative/ReferenceTypesPitFalls",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/SomePitfalls/JsNative/ReferenceTypesPitFalls.vue')
                  },
                  {
                    "name": "ElementScroll",
                    "path": "/front/ProjectsAndSoftSkills/SomePitfalls/JsNative/ElementScroll",
                    "component": () => import('@/views/front/ProjectsAndSoftSkills/SomePitfalls/JsNative/ElementScroll.vue')
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
    "name": "backend",
    "path": "/backend",
    "children": [
      {
        "name": "NodeJS",
        "path": "/backend/NodeJS",
        "children": [
          {
            "name": "NodeJSBasicKnowledge",
            "path": "/backend/NodeJS/NodeJSBasicKnowledge",
            "component": () => import('@/views/backend/NodeJS/NodeJSBasicKnowledge.vue')
          },
          {
            "name": "NodeJSKnowledgeRoadmap",
            "path": "/backend/NodeJS/NodeJSKnowledgeRoadmap",
            "component": () => import('@/views/backend/NodeJS/NodeJSKnowledgeRoadmap.vue')
          },
          {
            "name": "GlobalVariables",
            "path": "/backend/NodeJS/GlobalVariables",
            "component": () => import('@/views/backend/NodeJS/GlobalVariables.vue')
          },
          {
            "name": "NodeModules",
            "path": "/backend/NodeJS/NodeModules",
            "children": [
              {
                "name": "FileSystem",
                "path": "/backend/NodeJS/NodeModules/FileSystem",
                "component": () => import('@/views/backend/NodeJS/NodeModules/FileSystem.vue')
              },
              {
                "name": "Path",
                "path": "/backend/NodeJS/NodeModules/Path",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Path.vue')
              },
              {
                "name": "HTTP",
                "path": "/backend/NodeJS/NodeModules/HTTP",
                "component": () => import('@/views/backend/NodeJS/NodeModules/HTTP.vue')
              },
              {
                "name": "HTTPS",
                "path": "/backend/NodeJS/NodeModules/HTTPS",
                "component": () => import('@/views/backend/NodeJS/NodeModules/HTTPS.vue')
              },
              {
                "name": "Stream",
                "path": "/backend/NodeJS/NodeModules/Stream",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Stream.vue')
              },
              {
                "name": "Events2",
                "path": "/backend/NodeJS/NodeModules/Events2",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Events2.vue')
              },
              {
                "name": "OS",
                "path": "/backend/NodeJS/NodeModules/OS",
                "component": () => import('@/views/backend/NodeJS/NodeModules/OS.vue')
              },
              {
                "name": "Process",
                "path": "/backend/NodeJS/NodeModules/Process",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Process.vue')
              },
              {
                "name": "ProcessNextTick",
                "path": "/backend/NodeJS/NodeModules/ProcessNextTick",
                "component": () => import('@/views/backend/NodeJS/NodeModules/ProcessNextTick.vue')
              },
              {
                "name": "ChildProcess",
                "path": "/backend/NodeJS/NodeModules/ChildProcess",
                "component": () => import('@/views/backend/NodeJS/NodeModules/ChildProcess.vue')
              },
              {
                "name": "Buffer",
                "path": "/backend/NodeJS/NodeModules/Buffer",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Buffer.vue')
              },
              {
                "name": "Util",
                "path": "/backend/NodeJS/NodeModules/Util",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Util.vue')
              },
              {
                "name": "Crypto",
                "path": "/backend/NodeJS/NodeModules/Crypto",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Crypto.vue')
              },
              {
                "name": "cryptoAdvanced",
                "path": "/backend/NodeJS/NodeModules/cryptoAdvanced",
                "component": () => import('@/views/backend/NodeJS/NodeModules/cryptoAdvanced.vue')
              },
              {
                "name": "Net",
                "path": "/backend/NodeJS/NodeModules/Net",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Net.vue')
              },
              {
                "name": "DNS",
                "path": "/backend/NodeJS/NodeModules/DNS",
                "component": () => import('@/views/backend/NodeJS/NodeModules/DNS.vue')
              },
              {
                "name": "TLS",
                "path": "/backend/NodeJS/NodeModules/TLS",
                "component": () => import('@/views/backend/NodeJS/NodeModules/TLS.vue')
              },
              {
                "name": "URL",
                "path": "/backend/NodeJS/NodeModules/URL",
                "component": () => import('@/views/backend/NodeJS/NodeModules/URL.vue')
              },
              {
                "name": "QueryString",
                "path": "/backend/NodeJS/NodeModules/QueryString",
                "component": () => import('@/views/backend/NodeJS/NodeModules/QueryString.vue')
              },
              {
                "name": "Readline",
                "path": "/backend/NodeJS/NodeModules/Readline",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Readline.vue')
              },
              {
                "name": "Assert",
                "path": "/backend/NodeJS/NodeModules/Assert",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Assert.vue')
              },
              {
                "name": "Zlib",
                "path": "/backend/NodeJS/NodeModules/Zlib",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Zlib.vue')
              },
              {
                "name": "VM",
                "path": "/backend/NodeJS/NodeModules/VM",
                "component": () => import('@/views/backend/NodeJS/NodeModules/VM.vue')
              },
              {
                "name": "Module",
                "path": "/backend/NodeJS/NodeModules/Module",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Module.vue')
              },
              {
                "name": "Punycode",
                "path": "/backend/NodeJS/NodeModules/Punycode",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Punycode.vue')
              },
              {
                "name": "Timers",
                "path": "/backend/NodeJS/NodeModules/Timers",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Timers.vue')
              },
              {
                "name": "Domain",
                "path": "/backend/NodeJS/NodeModules/Domain",
                "component": () => import('@/views/backend/NodeJS/NodeModules/Domain.vue')
              }
            ]
          },
          {
            "name": "NodeAdvancedModules",
            "path": "/backend/NodeJS/NodeAdvancedModules",
            "children": [
              {
                "name": "Cluster",
                "path": "/backend/NodeJS/NodeAdvancedModules/Cluster",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/Cluster.vue')
              },
              {
                "name": "Dgram",
                "path": "/backend/NodeJS/NodeAdvancedModules/Dgram",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/Dgram.vue')
              },
              {
                "name": "Inspector",
                "path": "/backend/NodeJS/NodeAdvancedModules/Inspector",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/Inspector.vue')
              },
              {
                "name": "Net",
                "path": "/backend/NodeJS/NodeAdvancedModules/Net",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/Net.vue')
              },
              {
                "name": "PerfHooks",
                "path": "/backend/NodeJS/NodeAdvancedModules/PerfHooks",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/PerfHooks.vue')
              },
              {
                "name": "REPL",
                "path": "/backend/NodeJS/NodeAdvancedModules/REPL",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/REPL.vue')
              },
              {
                "name": "TLS",
                "path": "/backend/NodeJS/NodeAdvancedModules/TLS",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/TLS.vue')
              },
              {
                "name": "TraceEvents",
                "path": "/backend/NodeJS/NodeAdvancedModules/TraceEvents",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/TraceEvents.vue')
              },
              {
                "name": "WorkerThreads",
                "path": "/backend/NodeJS/NodeAdvancedModules/WorkerThreads",
                "component": () => import('@/views/backend/NodeJS/NodeAdvancedModules/WorkerThreads.vue')
              }
            ]
          },
          {
            "name": "PackageManager",
            "path": "/backend/NodeJS/PackageManager",
            "children": [
              {
                "name": "Npm",
                "path": "/backend/NodeJS/PackageManager/Npm",
                "children": [
                  {
                    "name": "NpmBasicKnowledge",
                    "path": "/backend/NodeJS/PackageManager/Npm/NpmBasicKnowledge",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/NpmBasicKnowledge.vue')
                  },
                  {
                    "name": "NpmCommonCommands",
                    "path": "/backend/NodeJS/PackageManager/Npm/NpmCommonCommands",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/NpmCommonCommands.vue')
                  },
                  {
                    "name": "Npx",
                    "path": "/backend/NodeJS/PackageManager/Npm/Npx",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/Npx.vue')
                  },
                  {
                    "name": "PackageJson",
                    "path": "/backend/NodeJS/PackageManager/Npm/PackageJson",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/PackageJson.vue')
                  },
                  {
                    "name": "PackageLockJson",
                    "path": "/backend/NodeJS/PackageManager/Npm/PackageLockJson",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/PackageLockJson.vue')
                  },
                  {
                    "name": "NpmrcFile",
                    "path": "/backend/NodeJS/PackageManager/Npm/NpmrcFile",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Npm/NpmrcFile.vue')
                  }
                ]
              },
              {
                "name": "Yarn",
                "path": "/backend/NodeJS/PackageManager/Yarn",
                "children": [
                  {
                    "name": "YarnBasicKnowledge",
                    "path": "/backend/NodeJS/PackageManager/Yarn/YarnBasicKnowledge",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Yarn/YarnBasicKnowledge.vue')
                  },
                  {
                    "name": "YarnCommonCommands",
                    "path": "/backend/NodeJS/PackageManager/Yarn/YarnCommonCommands",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Yarn/YarnCommonCommands.vue')
                  }
                ]
              },
              {
                "name": "Pnpm",
                "path": "/backend/NodeJS/PackageManager/Pnpm",
                "children": [
                  {
                    "name": "PnpmBasicKnowledge",
                    "path": "/backend/NodeJS/PackageManager/Pnpm/PnpmBasicKnowledge",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Pnpm/PnpmBasicKnowledge.vue')
                  },
                  {
                    "name": "PnpmCommonCommands",
                    "path": "/backend/NodeJS/PackageManager/Pnpm/PnpmCommonCommands",
                    "component": () => import('@/views/backend/NodeJS/PackageManager/Pnpm/PnpmCommonCommands.vue')
                  }
                ]
              },
              {
                "name": "PackageManagerComparison",
                "path": "/backend/NodeJS/PackageManager/PackageManagerComparison",
                "component": () => import('@/views/backend/NodeJS/PackageManager/PackageManagerComparison.vue')
              },
              {
                "name": "HardLinkAndSoftLinkAndSymbolLink",
                "path": "/backend/NodeJS/PackageManager/HardLinkAndSoftLinkAndSymbolLink",
                "component": () => import('@/views/backend/NodeJS/PackageManager/HardLinkAndSoftLinkAndSymbolLink.vue')
              },
              {
                "name": "NpmDownloadPackage",
                "path": "/backend/NodeJS/PackageManager/NpmDownloadPackage",
                "component": () => import('@/views/backend/NodeJS/PackageManager/NpmDownloadPackage.vue')
              },
              {
                "name": "NodeFindPackage",
                "path": "/backend/NodeJS/PackageManager/NodeFindPackage",
                "component": () => import('@/views/backend/NodeJS/PackageManager/NodeFindPackage.vue')
              },
              {
                "name": "UploadPackage",
                "path": "/backend/NodeJS/PackageManager/UploadPackage",
                "component": () => import('@/views/backend/NodeJS/PackageManager/UploadPackage.vue')
              }
            ]
          },
          {
            "name": "NodeJsFramework",
            "path": "/backend/NodeJS/NodeJsFramework",
            "children": [
              {
                "name": "FrameworkComparison",
                "path": "/backend/NodeJS/NodeJsFramework/FrameworkComparison",
                "component": () => import('@/views/backend/NodeJS/NodeJsFramework/FrameworkComparison.vue')
              },
              {
                "name": "Express",
                "path": "/backend/NodeJS/NodeJsFramework/Express",
                "component": () => import('@/views/backend/NodeJS/NodeJsFramework/Express.vue')
              },
              {
                "name": "Nest",
                "path": "/backend/NodeJS/NodeJsFramework/Nest",
                "component": () => import('@/views/backend/NodeJS/NodeJsFramework/Nest.vue')
              },
              {
                "name": "Koa",
                "path": "/backend/NodeJS/NodeJsFramework/Koa",
                "component": () => import('@/views/backend/NodeJS/NodeJsFramework/Koa.vue')
              }
            ]
          },
          {
            "name": "NodeOther",
            "path": "/backend/NodeJS/NodeOther",
            "children": [
              {
                "name": "WriteCommandLineTool",
                "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool",
                "children": [
                  {
                    "name": "CommandLineToolOverview",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/CommandLineToolOverview",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/CommandLineToolOverview.vue')
                  },
                  {
                    "name": "Commander",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/Commander",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/Commander.vue')
                  },
                  {
                    "name": "Inquirer",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/Inquirer",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/Inquirer.vue')
                  },
                  {
                    "name": "Chalk",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/Chalk",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/Chalk.vue')
                  },
                  {
                    "name": "Ora",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/Ora",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/Ora.vue')
                  },
                  {
                    "name": "EnquirerAndYargs",
                    "path": "/backend/NodeJS/NodeOther/WriteCommandLineTool/EnquirerAndYargs",
                    "component": () => import('@/views/backend/NodeJS/NodeOther/WriteCommandLineTool/EnquirerAndYargs.vue')
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "bun",
        "path": "/backend/bun",
        "children": [
          {
            "name": "BunIntroduction",
            "path": "/backend/bun/BunIntroduction",
            "component": () => import('@/views/backend/bun/BunIntroduction.vue')
          }
        ]
      }
    ]
  },
  {
    "name": "TeamCollaboration",
    "path": "/TeamCollaboration",
    "children": [
      {
        "name": "GitBase",
        "path": "/TeamCollaboration/GitBase",
        "component": () => import('@/views/TeamCollaboration/GitBase.vue')
      },
      {
        "name": "GitWorkflow",
        "path": "/TeamCollaboration/GitWorkflow",
        "component": () => import('@/views/TeamCollaboration/GitWorkflow.vue')
      },
      {
        "name": "GitCommand",
        "path": "/TeamCollaboration/GitCommand",
        "component": () => import('@/views/TeamCollaboration/GitCommand.vue')
      },
      {
        "name": "GitCommandEncyclopedia",
        "path": "/TeamCollaboration/GitCommandEncyclopedia",
        "component": () => import('@/views/TeamCollaboration/GitCommandEncyclopedia.vue')
      },
      {
        "name": "GitConflict",
        "path": "/TeamCollaboration/GitConflict",
        "component": () => import('@/views/TeamCollaboration/GitConflict.vue')
      },
      {
        "name": "GitBranch",
        "path": "/TeamCollaboration/GitBranch",
        "component": () => import('@/views/TeamCollaboration/GitBranch.vue')
      },
      {
        "name": "ResetAndRestoreAndRevert",
        "path": "/TeamCollaboration/ResetAndRestoreAndRevert",
        "children": [
          {
            "name": "Reset",
            "path": "/TeamCollaboration/ResetAndRestoreAndRevert/Reset",
            "component": () => import('@/views/TeamCollaboration/ResetAndRestoreAndRevert/Reset.vue')
          },
          {
            "name": "Revert",
            "path": "/TeamCollaboration/ResetAndRestoreAndRevert/Revert",
            "component": () => import('@/views/TeamCollaboration/ResetAndRestoreAndRevert/Revert.vue')
          },
          {
            "name": "Restore",
            "path": "/TeamCollaboration/ResetAndRestoreAndRevert/Restore",
            "component": () => import('@/views/TeamCollaboration/ResetAndRestoreAndRevert/Restore.vue')
          },
          {
            "name": "ResetAndRestoreAndRevertSummary",
            "path": "/TeamCollaboration/ResetAndRestoreAndRevert/ResetAndRestoreAndRevertSummary",
            "component": () => import('@/views/TeamCollaboration/ResetAndRestoreAndRevert/ResetAndRestoreAndRevertSummary.vue')
          }
        ]
      },
      {
        "name": "LogAndReflog",
        "path": "/TeamCollaboration/LogAndReflog",
        "component": () => import('@/views/TeamCollaboration/LogAndReflog.vue')
      },
      {
        "name": "GitCherryPick",
        "path": "/TeamCollaboration/GitCherryPick",
        "component": () => import('@/views/TeamCollaboration/GitCherryPick.vue')
      },
      {
        "name": "Rebase",
        "path": "/TeamCollaboration/Rebase",
        "component": () => import('@/views/TeamCollaboration/Rebase.vue')
      },
      {
        "name": "GitTagAndGitAlias",
        "path": "/TeamCollaboration/GitTagAndGitAlias",
        "component": () => import('@/views/TeamCollaboration/GitTagAndGitAlias.vue')
      },
      {
        "name": "Husky1",
        "path": "/TeamCollaboration/Husky1",
        "component": () => import('@/views/TeamCollaboration/Husky1.vue')
      },
      {
        "name": "FeatureBranchAndTrunkBased",
        "path": "/TeamCollaboration/FeatureBranchAndTrunkBased",
        "component": () => import('@/views/TeamCollaboration/FeatureBranchAndTrunkBased.vue')
      },
      {
        "name": "GitBisect",
        "path": "/TeamCollaboration/GitBisect",
        "component": () => import('@/views/TeamCollaboration/GitBisect.vue')
      },
      {
        "name": "GitIgnore",
        "path": "/TeamCollaboration/GitIgnore",
        "component": () => import('@/views/TeamCollaboration/GitIgnore.vue')
      }
    ]
  },
  {
    "name": "ComputerBasicKnowledge",
    "path": "/ComputerBasicKnowledge",
    "children": [
      {
        "name": "ComputerLearningPath",
        "path": "/ComputerBasicKnowledge/ComputerLearningPath",
        "component": () => import('@/views/ComputerBasicKnowledge/ComputerLearningPath.vue')
      },
      {
        "name": "ComputerComposition",
        "path": "/ComputerBasicKnowledge/ComputerComposition",
        "children": [
          {
            "name": "ComputerHistory",
            "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerHistory",
            "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerHistory.vue')
          },
          {
            "name": "ComputerCompositionOverview",
            "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionOverview",
            "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionOverview.vue')
          },
          {
            "name": "ComputerCompositionParts",
            "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts",
            "children": [
              {
                "name": "cpu",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/cpu",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/cpu.vue')
              },
              {
                "name": "Memory",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/Memory",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/Memory.vue')
              },
              {
                "name": "HardDisk",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/HardDisk",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/HardDisk.vue')
              },
              {
                "name": "MainBoard",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/MainBoard",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/MainBoard.vue')
              },
              {
                "name": "IO",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/IO",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/IO.vue')
              },
              {
                "name": "GraphicsCard",
                "path": "/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/GraphicsCard",
                "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/ComputerCompositionParts/GraphicsCard.vue')
              }
            ]
          },
          {
            "name": "BinaryConversion",
            "path": "/ComputerBasicKnowledge/ComputerComposition/BinaryConversion",
            "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/BinaryConversion.vue')
          },
          {
            "name": "DigitalLogic",
            "path": "/ComputerBasicKnowledge/ComputerComposition/DigitalLogic",
            "component": () => import('@/views/ComputerBasicKnowledge/ComputerComposition/DigitalLogic.vue')
          }
        ]
      },
      {
        "name": "OperatingSystem",
        "path": "/ComputerBasicKnowledge/OperatingSystem",
        "children": [
          {
            "name": "OperatingSystems",
            "path": "/ComputerBasicKnowledge/OperatingSystem/OperatingSystems",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/OperatingSystems.vue')
          },
          {
            "name": "FileSystem",
            "path": "/ComputerBasicKnowledge/OperatingSystem/FileSystem",
            "children": [
              {
                "name": "HardlinkAndSoftlink",
                "path": "/ComputerBasicKnowledge/OperatingSystem/FileSystem/HardlinkAndSoftlink",
                "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/FileSystem/HardlinkAndSoftlink.vue')
              },
              {
                "name": "FileSystemPrinciple",
                "path": "/ComputerBasicKnowledge/OperatingSystem/FileSystem/FileSystemPrinciple",
                "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/FileSystem/FileSystemPrinciple.vue')
              }
            ]
          },
          {
            "name": "ProcessAndThread",
            "path": "/ComputerBasicKnowledge/OperatingSystem/ProcessAndThread",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/ProcessAndThread.vue')
          },
          {
            "name": "ProcessAndThreadConcepts",
            "path": "/ComputerBasicKnowledge/OperatingSystem/ProcessAndThreadConcepts",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/ProcessAndThreadConcepts.vue')
          },
          {
            "name": "InterProcessCommunication",
            "path": "/ComputerBasicKnowledge/OperatingSystem/InterProcessCommunication",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/InterProcessCommunication.vue')
          },
          {
            "name": "ProcessScheduling",
            "path": "/ComputerBasicKnowledge/OperatingSystem/ProcessScheduling",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/ProcessScheduling.vue')
          },
          {
            "name": "ProcessSchedulingAlgorithm",
            "path": "/ComputerBasicKnowledge/OperatingSystem/ProcessSchedulingAlgorithm",
            "component": () => import('@/views/ComputerBasicKnowledge/OperatingSystem/ProcessSchedulingAlgorithm.vue')
          }
        ]
      },
      {
        "name": "CompilerPrinciple",
        "path": "/ComputerBasicKnowledge/CompilerPrinciple",
        "children": [
          {
            "name": "CompilerPrincipleOverview",
            "path": "/ComputerBasicKnowledge/CompilerPrinciple/CompilerPrincipleOverview",
            "component": () => import('@/views/ComputerBasicKnowledge/CompilerPrinciple/CompilerPrincipleOverview.vue')
          },
          {
            "name": "AOTAndJIT",
            "path": "/ComputerBasicKnowledge/CompilerPrinciple/AOTAndJIT",
            "component": () => import('@/views/ComputerBasicKnowledge/CompilerPrinciple/AOTAndJIT.vue')
          }
        ]
      },
      {
        "name": "AssemblyLanguage",
        "path": "/ComputerBasicKnowledge/AssemblyLanguage",
        "component": () => import('@/views/ComputerBasicKnowledge/AssemblyLanguage.vue')
      },
      {
        "name": "CharacterEncoding",
        "path": "/ComputerBasicKnowledge/CharacterEncoding",
        "component": () => import('@/views/ComputerBasicKnowledge/CharacterEncoding.vue')
      },
      {
        "name": "BasicAlgorithm",
        "path": "/ComputerBasicKnowledge/BasicAlgorithm",
        "children": [
          {
            "name": "SortingAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/SortingAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/SortingAlgorithm1.vue')
          },
          {
            "name": "SearchAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/SearchAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/SearchAlgorithm1.vue')
          },
          {
            "name": "RecursiveAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/RecursiveAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/RecursiveAlgorithm1.vue')
          },
          {
            "name": "DynamicProgrammingBasic",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/DynamicProgrammingBasic",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/DynamicProgrammingBasic.vue')
          },
          {
            "name": "GreedyAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/GreedyAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/GreedyAlgorithm1.vue')
          },
          {
            "name": "DivideAndConquer1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/DivideAndConquer1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/DivideAndConquer1.vue')
          },
          {
            "name": "BacktrackingAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/BacktrackingAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/BacktrackingAlgorithm1.vue')
          },
          {
            "name": "BranchAndBoundAlgorithm1",
            "path": "/ComputerBasicKnowledge/BasicAlgorithm/BranchAndBoundAlgorithm1",
            "component": () => import('@/views/ComputerBasicKnowledge/BasicAlgorithm/BranchAndBoundAlgorithm1.vue')
          }
        ]
      },
      {
        "name": "DataStructureBasic",
        "path": "/ComputerBasicKnowledge/DataStructureBasic",
        "children": [
          {
            "name": "Array2",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Array2",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Array2.vue')
          },
          {
            "name": "LinkedList1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/LinkedList1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/LinkedList1.vue')
          },
          {
            "name": "Stack1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Stack1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Stack1.vue')
          },
          {
            "name": "Queue1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Queue1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Queue1.vue')
          },
          {
            "name": "Tree1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Tree1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Tree1.vue')
          },
          {
            "name": "Graph1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Graph1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Graph1.vue')
          },
          {
            "name": "Heap1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/Heap1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/Heap1.vue')
          },
          {
            "name": "HashTable1",
            "path": "/ComputerBasicKnowledge/DataStructureBasic/HashTable1",
            "component": () => import('@/views/ComputerBasicKnowledge/DataStructureBasic/HashTable1.vue')
          }
        ]
      },
      {
        "name": "CMDCommand",
        "path": "/ComputerBasicKnowledge/CMDCommand",
        "component": () => import('@/views/ComputerBasicKnowledge/CMDCommand.vue')
      },
      {
        "name": "macCommand",
        "path": "/ComputerBasicKnowledge/macCommand",
        "component": () => import('@/views/ComputerBasicKnowledge/macCommand.vue')
      }
    ]
  },
  {
    "name": "AlgorithmsAndDataStructures",
    "path": "/AlgorithmsAndDataStructures",
    "children": [
      {
        "name": "WhyAlgorithmsAndDataStructures",
        "path": "/AlgorithmsAndDataStructures/WhyAlgorithmsAndDataStructures",
        "component": () => import('@/views/AlgorithmsAndDataStructures/WhyAlgorithmsAndDataStructures.vue')
      },
      {
        "name": "DataStructures",
        "path": "/AlgorithmsAndDataStructures/DataStructures",
        "children": [
          {
            "name": "DataStructuresIntroduction",
            "path": "/AlgorithmsAndDataStructures/DataStructures/DataStructuresIntroduction",
            "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/DataStructuresIntroduction.vue')
          },
          {
            "name": "Stack",
            "path": "/AlgorithmsAndDataStructures/DataStructures/Stack",
            "children": [
              {
                "name": "StackBase",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Stack/StackBase",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Stack/StackBase.vue')
              },
              {
                "name": "StackAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Stack/StackAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Stack/StackAlgorithm.vue')
              }
            ]
          },
          {
            "name": "ArrayOperations",
            "path": "/AlgorithmsAndDataStructures/DataStructures/ArrayOperations",
            "children": [
              {
                "name": "ArrayBasic",
                "path": "/AlgorithmsAndDataStructures/DataStructures/ArrayOperations/ArrayBasic",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/ArrayOperations/ArrayBasic.vue')
              },
              {
                "name": "ArrayAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/ArrayOperations/ArrayAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/ArrayOperations/ArrayAlgorithm.vue')
              }
            ]
          },
          {
            "name": "LinkedList",
            "path": "/AlgorithmsAndDataStructures/DataStructures/LinkedList",
            "children": [
              {
                "name": "LinkedListBasic",
                "path": "/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasic",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasic.vue')
              },
              {
                "name": "LinkedListBasicOperations",
                "path": "/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasicOperations",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasicOperations.vue')
              },
              {
                "name": "LinkedListBasicAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasicAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListBasicAlgorithm.vue')
              },
              {
                "name": "LinkedListAlgorithmList",
                "path": "/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListAlgorithmList",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/LinkedList/LinkedListAlgorithmList.vue')
              }
            ]
          },
          {
            "name": "Queue",
            "path": "/AlgorithmsAndDataStructures/DataStructures/Queue",
            "children": [
              {
                "name": "QueueBase",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Queue/QueueBase",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Queue/QueueBase.vue')
              },
              {
                "name": "QueueAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Queue/QueueAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Queue/QueueAlgorithm.vue')
              }
            ]
          },
          {
            "name": "HashTable",
            "path": "/AlgorithmsAndDataStructures/DataStructures/HashTable",
            "children": [
              {
                "name": "HashTableIntroduction",
                "path": "/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableIntroduction.vue')
              },
              {
                "name": "HashTableImplementation",
                "path": "/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableImplementation",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableImplementation.vue')
              },
              {
                "name": "HashTableAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/HashTable/HashTableAlgorithm.vue')
              }
            ]
          },
          {
            "name": "Trees",
            "path": "/AlgorithmsAndDataStructures/DataStructures/Trees",
            "children": [
              {
                "name": "TreeBasic",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/TreeBasic",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/TreeBasic.vue')
              },
              {
                "name": "TreeClassification",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/TreeClassification",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/TreeClassification.vue')
              },
              {
                "name": "TrieTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/TrieTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/TrieTree.vue')
              },
              {
                "name": "BinaryTreeAndBinarySearchTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/BinaryTreeAndBinarySearchTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/BinaryTreeAndBinarySearchTree.vue')
              },
              {
                "name": "2-3Tree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/2-3Tree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/2-3Tree.vue')
              },
              {
                "name": "BTreeAndBPlusTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/BTreeAndBPlusTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/BTreeAndBPlusTree.vue')
              },
              {
                "name": "RedBlackTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/RedBlackTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/RedBlackTree.vue')
              },
              {
                "name": "SegmentTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/SegmentTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/SegmentTree.vue')
              },
              {
                "name": "HuffmanTree",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/HuffmanTree",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/HuffmanTree.vue')
              },
              {
                "name": "TreeTraversal",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/TreeTraversal",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/TreeTraversal.vue')
              },
              {
                "name": "TreeBasicAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Trees/TreeBasicAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Trees/TreeBasicAlgorithm.vue')
              }
            ]
          },
          {
            "name": "Heap",
            "path": "/AlgorithmsAndDataStructures/DataStructures/Heap",
            "children": [
              {
                "name": "HeapIntroduction",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Heap/HeapIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Heap/HeapIntroduction.vue')
              },
              {
                "name": "HeapImplementation",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Heap/HeapImplementation",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Heap/HeapImplementation.vue')
              }
            ]
          },
          {
            "name": "Graph",
            "path": "/AlgorithmsAndDataStructures/DataStructures/Graph",
            "children": [
              {
                "name": "GraphBasic",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/GraphBasic",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/GraphBasic.vue')
              },
              {
                "name": "GraphClassification",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/GraphClassification",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/GraphClassification.vue')
              },
              {
                "name": "GraphStorageWay",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/GraphStorageWay",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/GraphStorageWay.vue')
              },
              {
                "name": "GraphAlgorithm1",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/GraphAlgorithm1",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/GraphAlgorithm1.vue')
              },
              {
                "name": "DijkstraAlgorithm1",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/DijkstraAlgorithm1",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/DijkstraAlgorithm1.vue')
              },
              {
                "name": "FloydAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/FloydAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/FloydAlgorithm.vue')
              },
              {
                "name": "BellmanFordAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/BellmanFordAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/BellmanFordAlgorithm.vue')
              },
              {
                "name": "PrimAndKruskalAlgorithm",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/PrimAndKruskalAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/PrimAndKruskalAlgorithm.vue')
              },
              {
                "name": "TopologicalSorting",
                "path": "/AlgorithmsAndDataStructures/DataStructures/Graph/TopologicalSorting",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/Graph/TopologicalSorting.vue')
              }
            ]
          },
          {
            "name": "OtherDataStructures",
            "path": "/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures",
            "children": [
              {
                "name": "OtherDataStructuresIntroduction",
                "path": "/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/OtherDataStructuresIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/OtherDataStructuresIntroduction.vue')
              },
              {
                "name": "SkipList",
                "path": "/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/SkipList",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/SkipList.vue')
              },
              {
                "name": "BloomFilter",
                "path": "/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/BloomFilter",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/BloomFilter.vue')
              },
              {
                "name": "UnionFind",
                "path": "/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/UnionFind",
                "component": () => import('@/views/AlgorithmsAndDataStructures/DataStructures/OtherDataStructures/UnionFind.vue')
              }
            ]
          }
        ]
      },
      {
        "name": "Algorithms",
        "path": "/AlgorithmsAndDataStructures/Algorithms",
        "children": [
          {
            "name": "AlgorithmIntroduction",
            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmIntroduction",
            "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmIntroduction.vue')
          },
          {
            "name": "60Algorithms",
            "path": "/AlgorithmsAndDataStructures/Algorithms/60Algorithms",
            "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/60Algorithms.vue')
          },
          {
            "name": "AlgorithmBasic",
            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic",
            "children": [
              {
                "name": "Complexity",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/Complexity",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/Complexity.vue')
              },
              {
                "name": "Recursion",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/Recursion",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/Recursion.vue')
              },
              {
                "name": "SortingAlgorithm3",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/SortingAlgorithm3",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/SortingAlgorithm3.vue')
              },
              {
                "name": "GreedyAlgorithmIntroduction",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/GreedyAlgorithmIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/GreedyAlgorithmIntroduction.vue')
              },
              {
                "name": "BacktrackingAlgorithmIntroduction",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/BacktrackingAlgorithmIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/BacktrackingAlgorithmIntroduction.vue')
              },
              {
                "name": "DivideAndConquerAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/DivideAndConquerAlgorithm",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/DivideAndConquerAlgorithm.vue')
              },
              {
                "name": "SearchAlgorithmIntroduction",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/SearchAlgorithmIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/SearchAlgorithmIntroduction.vue')
              },
              {
                "name": "DynamicProgramming1",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/DynamicProgramming1",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmBasic/DynamicProgramming1.vue')
              }
            ]
          },
          {
            "name": "AlgorithmClassification",
            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification",
            "children": [
              {
                "name": "AlgorithmClassificationIntroduction",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/AlgorithmClassificationIntroduction",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/AlgorithmClassificationIntroduction.vue')
              },
              {
                "name": "SortingAlgorithmIntroduction",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SortingAlgorithmIntroduction",
                "children": [
                  {
                    "name": "SortingAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SortingAlgorithmIntroduction/SortingAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SortingAlgorithmIntroduction/SortingAlgorithm.vue')
                  },
                  {
                    "name": "OtherSortingAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SortingAlgorithmIntroduction/OtherSortingAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SortingAlgorithmIntroduction/OtherSortingAlgorithm.vue')
                  }
                ]
              },
              {
                "name": "RecursionAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/RecursionAlgorithm",
                "children": [
                  {
                    "name": "RecursionAlgorithmBasic",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/RecursionAlgorithm/RecursionAlgorithmBasic",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/RecursionAlgorithm/RecursionAlgorithmBasic.vue')
                  },
                  {
                    "name": "RecursionAlgorithmProblem",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/RecursionAlgorithm/RecursionAlgorithmProblem",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/RecursionAlgorithm/RecursionAlgorithmProblem.vue')
                  }
                ]
              },
              {
                "name": "DivideAndConquerAlgorithm2",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DivideAndConquerAlgorithm2",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DivideAndConquerAlgorithm2.vue')
              },
              {
                "name": "DynamicProgramming",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming",
                "children": [
                  {
                    "name": "DynamicProgrammingStateDefinitionAndStateTransitionEquation",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingStateDefinitionAndStateTransitionEquation",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingStateDefinitionAndStateTransitionEquation.vue')
                  },
                  {
                    "name": "DynamicProgrammingClassification",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification",
                    "children": [
                      {
                        "name": "DynamicProgrammingClassificationOverview",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingClassificationOverview",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingClassificationOverview.vue')
                      },
                      {
                        "name": "DynamicProgrammingKnapsackProblem",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingKnapsackProblem",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingKnapsackProblem.vue')
                      },
                      {
                        "name": "DynamicProgrammingLinearDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingLinearDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingLinearDP.vue')
                      },
                      {
                        "name": "DynamicProgrammingIntervalDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingIntervalDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingIntervalDP.vue')
                      },
                      {
                        "name": "DynamicProgrammingTreeDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingTreeDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingTreeDP.vue')
                      },
                      {
                        "name": "DynamicProgrammingStateCompressionDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingStateCompressionDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingStateCompressionDP.vue')
                      },
                      {
                        "name": "DynamicProgrammingSpecificDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingSpecificDP",
                        "children": [
                          {
                            "name": "Robbery",
                            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingSpecificDP/Robbery",
                            "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingClassification/DynamicProgrammingSpecificDP/Robbery.vue')
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "DynamicProgrammingProblem",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem",
                    "children": [
                      {
                        "name": "DynamicProgrammingSimpleDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingSimpleDP",
                        "children": [
                          {
                            "name": "LongestIncreasingSubsequence2",
                            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingSimpleDP/LongestIncreasingSubsequence2",
                            "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingSimpleDP/LongestIncreasingSubsequence2.vue')
                          }
                        ]
                      },
                      {
                        "name": "DynamicProgrammingMediumDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingMediumDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingMediumDP.vue')
                      },
                      {
                        "name": "DynamicProgrammingHardDP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingHardDP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/DynamicProgramming/DynamicProgrammingProblem/DynamicProgrammingHardDP.vue')
                      }
                    ]
                  }
                ]
              },
              {
                "name": "SearchAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm",
                "children": [
                  {
                    "name": "DepthFirstSearch",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/DepthFirstSearch",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/DepthFirstSearch.vue')
                  },
                  {
                    "name": "BreadthFirstSearch",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BreadthFirstSearch",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BreadthFirstSearch.vue')
                  },
                  {
                    "name": "BinarySearch",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BinarySearch",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BinarySearch.vue')
                  },
                  {
                    "name": "BacktrackingAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BacktrackingAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/BacktrackingAlgorithm.vue')
                  },
                  {
                    "name": "EnumerationAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/EnumerationAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/SearchAlgorithm/EnumerationAlgorithm.vue')
                  }
                ]
              },
              {
                "name": "GreedyAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/GreedyAlgorithm",
                "children": [
                  {
                    "name": "GreedyAlgorithmProblem",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/GreedyAlgorithm/GreedyAlgorithmProblem",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/GreedyAlgorithm/GreedyAlgorithmProblem.vue')
                  },
                  {
                    "name": "DijkstraAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/GreedyAlgorithm/DijkstraAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/GreedyAlgorithm/DijkstraAlgorithm.vue')
                  }
                ]
              },
              {
                "name": "MappingAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm",
                "children": [
                  {
                    "name": "VLQ",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/VLQ",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/VLQ.vue')
                  },
                  {
                    "name": "HashAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/HashAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/HashAlgorithm.vue')
                  },
                  {
                    "name": "BitOpe",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/BitOpe",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/MappingAlgorithm/BitOpe.vue')
                  }
                ]
              },
              {
                "name": "CompressionAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm",
                "children": [
                  {
                    "name": "LossyCompressionAlgorithmIntroduction",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LossyCompressionAlgorithmIntroduction",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LossyCompressionAlgorithmIntroduction.vue')
                  },
                  {
                    "name": "LosslessCompressionAlgorithmIntroduction",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LosslessCompressionAlgorithmIntroduction",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LosslessCompressionAlgorithmIntroduction.vue')
                  },
                  {
                    "name": "HuffmanEncoding1",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/HuffmanEncoding1",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/HuffmanEncoding1.vue')
                  },
                  {
                    "name": "LZ77Algorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LZ77Algorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/LZ77Algorithm.vue')
                  },
                  {
                    "name": "DEFLATEAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/DEFLATEAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/DEFLATEAlgorithm.vue')
                  },
                  {
                    "name": "ReferenceCounting",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/ReferenceCounting",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/CompressionAlgorithm/ReferenceCounting.vue')
                  }
                ]
              },
              {
                "name": "OtherAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm",
                "children": [
                  {
                    "name": "SlidingWindowAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm/SlidingWindowAlgorithm",
                    "children": [
                      {
                        "name": "LRUAlgorithm",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm/SlidingWindowAlgorithm/LRUAlgorithm",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm/SlidingWindowAlgorithm/LRUAlgorithm.vue')
                      }
                    ]
                  },
                  {
                    "name": "BoidsAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm/BoidsAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/OtherAlgorithm/BoidsAlgorithm.vue')
                  }
                ]
              },
              {
                "name": "StringAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm",
                "children": [
                  {
                    "name": "StringMatchingAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm",
                    "children": [
                      {
                        "name": "StringMatchingAlgorithmIntroduction",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/StringMatchingAlgorithmIntroduction",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/StringMatchingAlgorithmIntroduction.vue')
                      },
                      {
                        "name": "BFAndRKHash",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/BFAndRKHash",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/BFAndRKHash.vue')
                      },
                      {
                        "name": "KMP",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/KMP",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/KMP.vue')
                      },
                      {
                        "name": "BM",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/BM",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/BM.vue')
                      },
                      {
                        "name": "Sunday",
                        "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/Sunday",
                        "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringMatchingAlgorithm/Sunday.vue')
                      }
                    ]
                  },
                  {
                    "name": "StringEditDistanceAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringEditDistanceAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringEditDistanceAlgorithm.vue')
                  },
                  {
                    "name": "StringPermutationAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringPermutationAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringPermutationAlgorithm.vue')
                  },
                  {
                    "name": "StringCompressionAlgorithm",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringCompressionAlgorithm",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/StringAlgorithm/StringCompressionAlgorithm.vue')
                  }
                ]
              },
              {
                "name": "AdvancedAlgorithm",
                "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/AdvancedAlgorithm",
                "children": [
                  {
                    "name": "AdvancedAlgorithmOverview",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/AdvancedAlgorithm/AdvancedAlgorithmOverview",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmClassification/AdvancedAlgorithm/AdvancedAlgorithmOverview.vue')
                  }
                ]
              }
            ]
          },
          {
            "name": "HighFrequencyAlgorithms",
            "path": "/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms",
            "children": [
              {
                "name": "ProductionHighFrequencyAlgorithms",
                "path": "/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/ProductionHighFrequencyAlgorithms",
                "children": [
                  {
                    "name": "ProductionHighFrequencyAlgorithmsList",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/ProductionHighFrequencyAlgorithms/ProductionHighFrequencyAlgorithmsList",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/ProductionHighFrequencyAlgorithms/ProductionHighFrequencyAlgorithmsList.vue')
                  },
                  {
                    "name": "TwoSum",
                    "path": "/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/ProductionHighFrequencyAlgorithms/TwoSum",
                    "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/ProductionHighFrequencyAlgorithms/TwoSum.vue')
                  }
                ]
              },
              {
                "name": "InterviewHighFrequencyAlgorithms",
                "path": "/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/InterviewHighFrequencyAlgorithms",
                "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/HighFrequencyAlgorithms/InterviewHighFrequencyAlgorithms.vue')
              }
            ]
          },
          {
            "name": "AlgorithmProblemLibrary",
            "path": "/AlgorithmsAndDataStructures/Algorithms/AlgorithmProblemLibrary",
            "component": () => import('@/views/AlgorithmsAndDataStructures/Algorithms/AlgorithmProblemLibrary.vue')
          }
        ]
      }
    ]
  },
  {
    "name": "AI",
    "path": "/AI",
    "children": [
      {
        "name": "AIType",
        "path": "/AI/AIType",
        "component": () => import('@/views/AI/AIType.vue')
      },
      {
        "name": "ConceptIntroduction",
        "path": "/AI/ConceptIntroduction",
        "children": [
          {
            "name": "AIOverview",
            "path": "/AI/ConceptIntroduction/AIOverview",
            "component": () => import('@/views/AI/ConceptIntroduction/AIOverview.vue')
          },
          {
            "name": "Blockchain",
            "path": "/AI/ConceptIntroduction/Blockchain",
            "component": () => import('@/views/AI/ConceptIntroduction/Blockchain.vue')
          },
          {
            "name": "LargeModel",
            "path": "/AI/ConceptIntroduction/LargeModel",
            "component": () => import('@/views/AI/ConceptIntroduction/LargeModel.vue')
          }
        ]
      }
    ]
  },
  {
    "name": "GameProduction",
    "path": "/GameProduction",
    "children": [
      {
        "name": "GotDot",
        "path": "/GameProduction/GotDot",
        "component": () => import('@/views/GameProduction/GotDot.vue')
      },
      {
        "name": "Modeling",
        "path": "/GameProduction/Modeling",
        "component": () => import('@/views/GameProduction/Modeling.vue')
      },
      {
        "name": "FineArts",
        "path": "/GameProduction/FineArts",
        "component": () => import('@/views/GameProduction/FineArts.vue')
      }
    ]
  }
];
  