{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    git-hooks-nix.url = "github:cachix/git-hooks.nix";
    git-hooks-nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs @ { flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.git-hooks-nix.flakeModule ];

      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { config, pkgs, ... }: {
        pre-commit.settings = {
          hooks = {
            oxfmt = {
              enable = true;
              entry = "${pkgs.oxfmt}/bin/oxfmt";
              files = "\\.(tsx?|jsx?)$";
              types = [ "text" ];
            };

            oxlint = {
              enable = true;
              entry = "${pkgs.oxlint}/bin/oxlint";
              files = "\\.(tsx?|jsx?)$";
              types = [ "text" ];
            };
          };
        };

        devShells.default = pkgs.mkShell {
          shellHook = config.pre-commit.installationScript;
          packages = [
            pkgs.nodejs
            pkgs.pnpm
          ];
        };
      };
    };
}
