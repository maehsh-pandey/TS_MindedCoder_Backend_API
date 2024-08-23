export default {
    extends: ['@commitlint/config-conventional'], "commitlint": "Unknown word",
    rules: {
        "type-enum": [
            2,
            "always",
            [
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test'
            ]
        ],
        "subject-case": [2, "always", "sentence-case"]
    }
}; 
