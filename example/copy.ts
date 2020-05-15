export const copy = {
  'en-us': {
    header: {
      title: 'Copyful',
      subtitle: "Copy management shouldn't get in the way of code.",
      dynamicValues:
        'Yes, even dynamic values, like this number: {someNumber} and this string: {someString}.',
    },
    body:
      "Product copy can become difficult to manage across product platforms as well as internal design and engineering tooling. Copy changes frequently and for many reasons (more clarity, typo, legal guidance, etc...) and engineering **must** be involved to make these changes. Sometimes the changes aren't straightforward - it becomes a hunt across repositories or copy has drifted across our web and native applications.",
    footer: 'Awesome? - {anotherValue}',
  },
  '1337': {
    header: {
      title: 'c0pyful',
      subtitle: "c0py m4n463m3n7 5h0uldn'7 637 1n 7h3 w4y 0f c0d3.",
      dynamicValues:
        'y35, 3v3n dyn4m1c v4lu35, l1k3 7h15 numb3r: {someNumber} 4nd 7h15 57r1n6: {someString}.',
    },
    body:
      "pr0duc7 c0py c4n b3c0m3 d1ff1cul7 70 m4n463 4cr055 pr0duc7 pl47f0rm5 45 w3ll 45 1n73rn4l d3516n 4nd 3n61n33r1n6 700l1n6. c0py ch4n635 fr3qu3n7ly 4nd f0r m4ny r3450n5 (m0r3 cl4r17y, 7yp0, l364l 6u1d4nc3, 37c...) 4nd 3n61n33r1n6 **mu57** b3 1nv0lv3d 70 m4k3 7h353 ch4n635. 50m371m35 7h3 ch4n635 4r3n'7 57r416h7f0rw4rd - 17 b3c0m35 4 hun7 4cr055 r3p05170r135 0r c0py h45 dr1f73d 4cr055 0ur w3b 4nd n471v3 4ppl1c4710n5.",
    footer: '4w350m3? - {anotherValue}',
  },
} as const;
